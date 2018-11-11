import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import JobsList from './JobsList';

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

// export default graphql(getJobsList, {
//   skip: props => typeof props.projectID !== "string",
//   options: props => ({
//     variables: { projectID: props.projectID },
//   }),
// })(JobsList);

export default graphql(getJobsList, {
  skip: props => typeof props.projectID !== "string",
  options: props => {
    console.log('got props.projectID::', props.projectID)
    return {
      variables: { projectID: props.projectID },
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    }
  },
})(JobsList);


