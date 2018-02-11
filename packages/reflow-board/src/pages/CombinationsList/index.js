import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const getCombinationsList = gql`
query getNode($flowID: ID!) {
  node(id: $flowID) {
    ... on Flow {
        id
      title
      passes
      pending
      failures
      result
      status
      DAG
      totalNumberOfFlowCombinations
      currentNumberOfFlowCombinations
      combinations {
        edges {
          node {
            id
            startTime
            endTime
            passes
            pending
            passes
            failures
            diagram {
              viz
            }
          }
        }
      }
    }
  }
}
`;

export default graphql(getCombinationsList, {
  options: (props) => ({
    variables: { flowID: props.match.params.flowID },
  }),
})(Page);
