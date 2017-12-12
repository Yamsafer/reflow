import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const getJobsList = gql`
query getJobsList {
  jobs(first: 5) {
    id
    result
    startTime
    targetBranch
    trigger
    numberOfThreads
    numberOfFlows
    sourceBranch
    tags
  }
}
`;

export default graphql(getJobsList)(Page);
