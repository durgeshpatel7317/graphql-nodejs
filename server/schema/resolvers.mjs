import { userList, movieList } from "../data/test-data.mjs";
import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";

export const resolvers = {
  Query: {
    // User Resolvers
    users: (parent, args) => {
      const { id } = args;
      if (id) {
        return lodash.filter(userList, (user) => user.id === id);
      } else {
        return userList;
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
    favoriteMovies: () => {
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
};
