import { addDeviceMeasurement } from "./resolvers/mutations/addDeviceMeasurement";

const resolvers = {
  Query: {
    allTemperatureMeasurements: () => {
      return "HELLO";
    },
  },

  Mutation: {
    addDeviceMeasurement: addDeviceMeasurement,
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
