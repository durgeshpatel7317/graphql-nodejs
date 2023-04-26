import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/type-defs.mjs";
import { resolvers } from "./schema/resolvers.mjs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  // https://www.apollographql.com/docs/apollo-server/data/context
  // Context are used to make a key value pair accessible through out all the graphql resolvers
  // Context can be used to pass the authorization key value pairs
  // Context is also useful to access the graphql request
  context: async () => {
    return { name: "Durgesh" };
  },
});
console.log(`🚀 Server ready at ${url}`);
