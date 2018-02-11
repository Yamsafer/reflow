import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const getJobsList = gql`
query getJobsList($projectID: ID!) {
  viewer {
    jobs(projectID: $projectID) {
      edges {
        node {
          id
          result
          status
          startTime
          endTime
          sourceBranch
          targetBranch
          trigger
          github
          tags
          numberOfFlows
          lastReported
          firstReported
          currentNumberOfCombinations
          totalNumberOfCombinations
          numberOfThreads
          jenkins
        }
      }
    }
  }
}`;

export default graphql(getJobsList, {
  skip: props => typeof props.match.params.projectName !== "string",
  options: props => ({
    variables: { projectID: "cHJvamVjdF82MzY2OTc3NjU3ODMzMjYzMTA0" },
  }),
})(Page);
