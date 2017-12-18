import React, {PureComponent} from 'react';
import Project from '../../components/Project'
import JobsList from '../../containers/JobsList';
import ProjectsList from '../../containers/ProjectsList';

import './style.css'

class ProjectsPage extends PureComponent {
  render() {
    const { match } = this.props;
    const projectName = match.params.projectName;
    const projects = [{link: "/project/yamsafer-backend/", name: "Yamsafer Backend"}]
    return (
      <div className="row">
        <div className="col-xs-4">
          <ProjectsList />
        </div>
        <div className="col-xs-8">
          {projectName && <JobsList projectName={projectName} />}
        </div>
      </div>
    );
  }
}

export default ProjectsPage
