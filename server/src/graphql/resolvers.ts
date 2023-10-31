import { GraphQLError } from "graphql";
import { Schema } from "mongoose";

import Device from "../models/device";
import TemperatureMeasurement from "../models/temperatureMeasurement";
import { isNumber } from "../typeNarrowing";

interface Context {
  currentDevice: string;
}

interface Args {
  temperature: number;
}

const resolvers = {
  Query: {},

  Mutation: {
    addTemperature: async (_root: unknown, args: Args, context: Context) => {
      const hardwareId = context.currentDevice;
      if (!hardwareId) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const temperature = args.temperature;
      if (!isNumber(temperature)) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.temperature,
          },
        });
      }

      const device = await Device.findOne({
        hardwareId,
      }).exec();
      if (!device) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
        });
      }

      const timestamp: Date = new Date();
      const metadata = device._id;

      const temperatureMeasurement = new TemperatureMeasurement({
        temperature,
        timestamp,
        metadata,
      });

      await temperatureMeasurement.save();
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {},
};

export default resolvers;
