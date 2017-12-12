import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const getCombinationsList = gql`
query getCombinationsList($flowID: ID!) {
  flow(id: $flowID) {
    passes
    pending
    failures
    combinations {
      id
      passes
      pending
      failures
      startTime
      result
    }
  }
}
`;

export default graphql(getCombinationsList, {
  options: (props) => ({
    variables: { flowID: props.match.params.flowID },
  }),
})(Page);
