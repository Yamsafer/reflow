import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ProjectsList from './ProjectsList';

const getProjectsList = gql`
query getProjectsList {
  viewer {
    projects {
      edges{
        node {
          id
          title
        }
      }
    }
  }
}`;

export default graphql(getProjectsList)(ProjectsList);
