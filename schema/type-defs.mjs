export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    age: Int!
    gender: String
    nationality: String
    email: String
    phone: String
    friends: [User!]
    favoriteMovies: [Movie!]
  }

  type Movie {
    id: ID!
    name: String!
    yop: Int!
    isInTheatre: Boolean!
    description: String
  }

  type Query {
    users(id: ID): [User!]!
    user(id: ID!): User
    movies: [Movie!]
    movie(name: String!): Movie
  }
`;
