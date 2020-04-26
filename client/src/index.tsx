import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { configure } from "mobx";

// MobX Configuration
configure({
  computedRequiresReaction: true,
  observableRequiresReaction: true,
  reactionRequiresObservable: true,
  enforceActions: "observed"
})

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