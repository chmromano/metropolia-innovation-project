// import { GraphQLError } from "graphql";
// import { PubSub } from "graphql-subscriptions";

// import TemperatureMeasurement from "../models/temperatureMeasurement";

// const pubsub = new PubSub();

const resolvers = {
  Query: {},

  Mutation: {
    // addBook: async (root, args, context) => {
    //   const currentUser = context.currentUser;
    //   if (!currentUser) {
    //     throw new GraphQLError("not authenticated", {
    //       extensions: {
    //         code: "BAD_USER_INPUT",
    //       },
    //     });
    //   }
    //   const existingAuthor = await Author.findOne({ name: args.author });
    //   const author = existingAuthor || new Author({ name: args.author });
    //   if (!existingAuthor) {
    //     try {
    //       await author.save();
    //     } catch (error) {
    //       console.log(error);
    //       throw new GraphQLError("Saving new author failed", {
    //         extensions: {
    //           error,
    //         },
    //       });
    //     }
    //   }
    //   const book = new Book({
    //     ...args,
    //     author: author._id,
    //   });
    //   author.books.push(book._id);
    //   await author.save();
    //   try {
    //     await book.save();
    //   } catch (error) {
    //     console.log(error);
    //     if (author.books.length === 1) {
    //       await Author.deleteOne({ _id: author._id });
    //     } else {
    //       author.books = author.books.filter((b) => b._id !== book._id);
    //       await author.save();
    //     }
    //     throw new GraphQLError("Saving book failed - Title too short", {
    //       extensions: {
    //         code: "BAD_USER_INPUT",
    //         invalidArgs: args.title,
    //         error,
    //       },
    //     });
    //   }
    //   const graphqlBook = {
    //     title: book.title,
    //     published: book.published,
    //     genres: book.genres,
    //     id: book._id.toString(),
    //     author: author.toObject(),
    //   };
    //   pubsub.publish("BOOK_ADDED", { bookAdded: graphqlBook });
    //   return graphqlBook;
    // },
  },

  Subscription: {},
};

export default resolvers;
