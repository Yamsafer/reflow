import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Page from './Page';

const jobsListQuery = gql`
query JobsListQuery {
  jobs(first: 5) {
    id,
    creationDate
  }
}
`;

export default graphql(jobsListQuery)(Page);
