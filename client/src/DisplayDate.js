import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      gender
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      yop
      isInTheatre
    }
  }
`;

function DisplaData() {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  if (loading) {
    return <h1>Data is loading...</h1>;
  }
  if (data) {
    console.log("here is the data ", data);
  }

  if (error) {
    console.error(
      "Error occurred while getting the data from graphql server.. ",
      error.message
    );
  }
  return (
    <>
      {data &&
        data?.users?.map((user) => {
          return (
            <div key={user.name}>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Gender: {user.gender}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}
      {movieData &&
        movieData?.movies?.map((movie) => {
          return (
            <div key={movie.name}>
              <h1>Movie Name: {movie.name}</h1>
              <h1>Production year: {movie.yop}</h1>
              <h1>Released in theatre: {movie.isInTheatre.toString()}</h1>
            </div>
          );
        })}
    </>
  );
}

export default DisplaData;
