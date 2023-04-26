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
    # Used union type as the return for users query
    users(id: ID): UserResult!
    user(id: ID!): User
    movies: [Movie!]
    movie(name: String!): Movie
  }

  input CreateUserInput {
    name: String!
    # Input with default value
    age: Int! = 18
    gender: String
    nationality: String
    email: String
    phone: String
    
  }

  input UpdateUsername {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(user: CreateUserInput!): User
    updateUsername(updateUser: UpdateUsername!): User
    deleteUser(id: ID!): User
  }

  type UsersSuccessResult {
    users: [User!]
  }

  type UsersErrorResult {
    message: String!
  }

  # Union type which can either be resolved to error or success
  union UserResult = UsersSuccessResult | UsersErrorResult
`;

// Query for union type
// query GetAllUsers {
//   users {
//     ...on UsersSuccessResult {
//       users {
//         id
//         name
//         age
//         nationality
//       }
//     }
//     ...on UsersErrorResult {
//       message
//     }
//   }
// }