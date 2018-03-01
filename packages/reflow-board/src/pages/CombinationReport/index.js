import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const getSuites = gql`
query getSuites($combinationID: ID!) {
  viewer {
    suites(combinationID: $combinationID) {
      edges {
        node {
          id
          title
          level
          tests {
            title
            result
            speed
            duration
            code
            err {
              message
              htmlMessage
              stacktrace
              sourceURL
              line
            }
            metadata {
              meta
              message
            }
          }
        }
      }
    }
  }
}
`;

export default graphql(getSuites, {
  options: (props) => ({
    variables: { combinationID: props.match.params.combinationID },
  }),
})(Page);
