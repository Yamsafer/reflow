import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const flowsList = gql`
query flowsList($jobID: ID!) {
  flows(jobID: $jobID) {
    id
    title
    passes
    pending
    failures
  }
}
`;

export default graphql(flowsList, {
  skip: (props) => typeof props.match.params.jobID !== "string",
  options: (props) => ({
    variables: { jobID: props.match.params.jobID },
  }),
})(Page);
