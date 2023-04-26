import { gql } from "@apollo/client";

// Fragment to get the common user fields
// https://www.apollographql.com/docs/react/data/fragments
export const USERS_COMMON_FIELD = gql`
  fragment GetUserDetails on User {
    id
    name
    age
    gender
    nationality
  }
`;
