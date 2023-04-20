import { userList, movieList } from "../data/test-data.mjs";
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
};
