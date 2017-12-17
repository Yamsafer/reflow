import React, { Component } from 'react';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import logo from '../logo.svg';
import './style.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import JobsList from '../pages/JobsList';
import CombinationsList from '../pages/CombinationsList'
import CombinationReport from '../pages/CombinationReport'
import NotFound from '../pages/NotFound'

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

const client = new ApolloClient({
  link: createHttpLink({
    // uri: '/graphql',
    uri: 'http://localhost:3000/graphql',
  }),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <nav className="navbar navbar-expand-md fixed-top">
              <Link to="/" className="navbar-brand">
                <img src={logo} className="App-logo" alt="logo" />
              </Link>
            </nav>
            <div className="App container-fluid">
              <Switch>
                <Route exact path="/" component={JobsList}/>
                <Route exact path="/project/:projectName" component={JobsList}/>
                <Route exact path="/project/:projectName/job/:jobID" component={JobsList}/>
                <Route path="/flow/:flowID" component={CombinationsList}/>
                <Route path="/combination/:combinationID" component={CombinationReport}/>
                <Route component={ NotFound }/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
};

export default App
