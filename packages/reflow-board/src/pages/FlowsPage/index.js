import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const flowsList = gql`
query getFlows($jobID: ID!) {
  viewer {
    flows(jobID: $jobID) {
      edges {
        node {
          id
          title
          passes
          pending
          failures
          result
          status
          totalNumberOfFlowCombinations
          currentNumberOfFlowCombinations
          DAG
        }
      }
    }
  }
}`;

export default graphql(flowsList, {
  skip: (props) => typeof props.match.params.jobID !== "string",
  options: (props) => ({
    variables: { jobID: props.match.params.jobID },
  }),
})(Page);
