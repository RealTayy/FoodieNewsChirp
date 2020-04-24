import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

console.log("GraphQLUri:", process.env.REACT_APP_HASURA_URI);

const client = new ApolloClient({
  uri: process.env.REACT_APP_HASURA_URI
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')

);