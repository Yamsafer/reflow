import React, { Component } from 'react';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import logo from '../logo.svg';
import './style.css';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import ProjectsPage from '../pages/ProjectsPage';
import FlowsPage from '../pages/FlowsPage';
import CombinationsList from '../pages/CombinationsList'
import CombinationReport from '../pages/CombinationReport'
import NotFound from '../pages/NotFound'

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

const uri = process.env.REACT_APP_REFLOW_DEVELOPMENT?
  'http://localhost:3000/graphql': 'https://automation.yamsafer.com:5555/graphql';

const client = new ApolloClient({
  link: createHttpLink({
    uri,
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
                <Route exact path="/" component={ProjectsPage}/>
                <Route exact path="/project/:projectID" component={ProjectsPage}/>
                <Route exact path="/job/:jobID" component={FlowsPage}/>
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
