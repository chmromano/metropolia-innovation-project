import { GraphQLError } from "graphql";

import { IDevice } from "../models/device";
import TemperatureMeasurement from "../models/temperatureMeasurement";
import { isNumber } from "../types/typeUtils";

interface Context {
  currentDevice: IDevice;
}

interface Args {
  temperature: number;
}

const resolvers = {
  Query: {
    allTemperatureMeasurements: () => {
      return "HELLO";
    },
  },

  Mutation: {
    addTemperatureMeasurement: async (
      _root: unknown,
      args: Args,
      context: Context
    ) => {
      const device = context.currentDevice;
      if (!device) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const temperature = args.temperature;
      if (!isNumber(temperature)) {
        throw new GraphQLError("invalid temperature", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.temperature,
          },
        });
      }

      const temperatureMeasurement = new TemperatureMeasurement({
        temperature,
        timestamp: new Date(),
        metadata: device._id,
      });

      await temperatureMeasurement.save();
    },
    // login: async (_root, args) => {
    //   const user = await User.findOne({ username: args.username });

    //   if (!user || args.password !== "secret") {
    //     throw new GraphQLError("wrong credentials", {
    //       extensions: { code: "BAD_USER_INPUT" },
    //     });
    //   }

    //   const userForToken = {
    //     username: user.username,
    //     id: user._id,
    //   };

    //   return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    // },
  },

  // Subscription: {},
};

export default resolvers;
