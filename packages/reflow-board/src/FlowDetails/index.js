import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const flowDetailsQuery = gql`
query FlowDetails($flowID: String!) {
  flowDetails(id: $flowID) {
    id,
    title
  }
}
`;

export default graphql(flowDetailsQuery, {
  options: (props) => ({
    variables: { flowID: props.match.params.flowID },
  }),
})(Page);
