import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const jobsDetailsQuery = gql`
query JobsDetailsQuery($jobID: String!) {
  jobDetails(id: $jobID) {
    id,
    title,
    startTime
  }
}
`;

export default graphql(jobsDetailsQuery, {
  options: (props) => ({
    variables: { jobID: props.match.params.jobID },
  }),
})(Page);
