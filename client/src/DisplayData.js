import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

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

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yop
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(user: $input) {
      id
      name
    }
  }
`;

function DisplaData() {
  const [movieSearched, setMovieSearched] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");

  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

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
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => setAge(event.target.value)}
        />
        <input
          type="text"
          placeholder="Gender..."
          onChange={(event) => setGender(event.target.value)}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(event) => setNationality(event.target.value)}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: {
                  name,
                  age: Number(age),
                  gender,
                  nationality,
                },
              },
            }).then(() => refetch());
          }}
        >
          Create user
        </button>
      </div>
      {data &&
        data?.users?.map((user, index) => {
          return (
            <div key={index}>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Gender: {user.gender}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}
      {movieData &&
        movieData?.movies?.map((movie, index) => {
          return (
            <div key={index}>
              <h1>Movie Name: {movie.name}</h1>
              <h1>Production year: {movie.yop}</h1>
              <h1>Released in theatre: {movie.isInTheatre.toString()}</h1>
            </div>
          );
        })}

      <div>
        <input
          type="text"
          placeholder="Intersteller..."
          onChange={(event) => setMovieSearched(event.target.value)}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          {" "}
          Fetch Data{" "}
        </button>
        <div>
          {movieSearchData && (
            <div>
              {""}
              <h1>MovieName: {movieSearchData.movie?.name}</h1>
              {""}
              <h1>Year of Publication: {movieSearchData.movie?.yop}</h1>
              {""}
            </div>
          )}
          {movieError && <h1>Error occurred while getting movies</h1>}
        </div>
      </div>
    </div>
  );
}

export default DisplaData;
