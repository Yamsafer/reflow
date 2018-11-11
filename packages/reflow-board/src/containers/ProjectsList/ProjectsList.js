import React, {PureComponent} from 'react';
import Project from '../../components/Project'
import {isNonEmpty, getRelayData} from '../../util'

class ProjectsList extends PureComponent {
  render() {
    const data = this.props.data || { skipped: true };
    const {loading, viewer, error, skipped } = data;
    const projects = getRelayData(viewer, 'projects');

    if (error) {
      return <p>{error.message}</p>;
    }

    // console.log('this.props::', this.props)
    // const projects = [{link: "/project/yamsafer-backend/", name: "Yamsafer Backend"}]
    return (
      <div>
        {projects.map(project => project.node).map((project, i) =>
          <Project
            key={project.id}
            project={project}
            linkTo={`/project/${project.id}`}
          />
        )}
      </div>
    );
  }
}

export default ProjectsList

