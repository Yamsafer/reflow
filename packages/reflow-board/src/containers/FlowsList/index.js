import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Container from './Container';

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
  skip: (props) => typeof props.jobID !== "string",
  // props.match.params.flowID
  options: (props) => ({
    variables: { jobID: props.jobID },
  }),
})(Container);
