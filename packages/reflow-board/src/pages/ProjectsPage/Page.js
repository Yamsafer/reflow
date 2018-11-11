import React, {PureComponent} from 'react';
import Project from '../../components/Project'
import JobsList from '../../containers/JobsList';
import ProjectsList from '../../containers/ProjectsList';

import './style.css'

class ProjectsPage extends PureComponent {
  render() {
    const projectID = this.props.match.params.projectID
    return (
      <div className="row">
        <div className="col-xs-4">
          <h1 className="title">Projects</h1>
          <ProjectsList onProjectSelected={this.onProjectSelected} />
        </div>
        <div className="col-xs-8">
          <h1 className="title">Jobs List</h1>
          <JobsList projectID={projectID} />
        </div>
      </div>
    );
  }
}

export default ProjectsPage
