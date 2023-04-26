import { userList, movieList } from "../data/test-data.mjs";
import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";

/**
 * query -> users -> favoriteMovies
 * Here when we access @parent on @users is will be null because query does not return anything
 * @parent in the child query gets triggered for each element being returned from the parent query
 * The element returned in @parent has the complete data not only the fields which are specified in the query
 */
export const resolvers = {
  Query: {
    // User Resolvers
    users: (parent, args, context) => {
      const { id } = args;
      console.log("value of parent for @users is ", parent);
      console.log("value of context for @users is ", context);
      if (userList) {
        if (id) {
          return { users: lodash.filter(userList, (user) => user.id === id) };
        } else {
          return { users: userList };
        }
      } else {
        return {
          message: "Yo, there was an error while retrieving the movie data...!",
        };
      }
    },
    user: (parent, args) => {
      const { id } = args;
      return lodash.find(userList, { id });
    },

    // Movie resolvers
    movies: () => {
      return movieList;
    },

    movie: (parent, args) => {
      const { name } = args;
      console.log("here is the name of movie ", name);
      return lodash.find(movieList, { name });
    },
  },
  User: {
    favoriteMovies: (parent) => {
      console.log("value of parent for @movie is ", parent);
      return lodash.filter(
        movieList,
        (movie) => movie.yop >= 2000 && movie.yop <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const { user } = args;
      user.id = uuidv4();
      userList.push(user);
      return user;
    },
    updateUsername: (parent, args) => {
      const { updateUser } = args;
      const user = lodash.find(userList, { id: updateUser.id });
      user.name = updateUser.newUsername;
      return user;
    },
    deleteUser: (parent, args) => {
      const { id } = args;
      const user = lodash.remove(userList, { id });
      console.log("here is the deleted user ", user);
      return null;
    },
  },

  /**
   * Resolvers for union type @UserResult
   */
  UserResult: {
    __resolveType(obj, contextValue) {
      if (obj.users) {
        return "UsersSuccessResult";
      }

      if (obj.message) {
        return "UsersErrorResult";
      }

      return null;
    },
  },
};
