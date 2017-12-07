import React, { Component } from 'react';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import logo from '../logo.svg';
import './style.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import JobsList from '../JobsList';
import JobDetails from '../JobDetails'
import FlowDetails from '../FlowDetails'
import NotFound from '../NotFound'

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <div className="App-header">
              <Link to="/" className="navbar">
                <img src={logo} className="App-logo" alt="logo" />
              </Link>
            </div>
            <Switch>
              <Route exact path="/" component={JobsList}/>
              <Route path="/job/:jobID" component={JobDetails}/>
              <Route path="/flow/:flowID" component={FlowDetails}/>
              <Route component={ NotFound }/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
};

export default App
