import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const getSuites = gql`
query getSuites($combinationID: ID!) {
  combination(id: $combinationID) {
    passes
    pending
    failures
    suites(first: 100) {
      title
      level
      tests {
        title
        result
        speed
        duration
        code
        metadata {
          meta
          message
        }
        err {
          htmlMessage
          stacktrace
          message
          sourceURL
          line
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
