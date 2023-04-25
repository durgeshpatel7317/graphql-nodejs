import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplaData from "./DisplayData";

// userQuery hook is used to query the graphql server
// useMutation hook is used to mutate the data on graphql server

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplaData />
      </div>
    </ApolloProvider>
  );
}

export default App;
