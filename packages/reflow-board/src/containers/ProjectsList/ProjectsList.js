import React, {PureComponent} from 'react';
import Project from '../../components/Project'

class ProjectsList extends PureComponent {
  render() {
    const projects = [{link: "/project/yamsafer-backend/", name: "Yamsafer Backend"}]
    return (
      <div>
        {projects.map((project, i) => <Project key={i} project={project} />)}
      </div>
    );
  }
}

export default ProjectsList

