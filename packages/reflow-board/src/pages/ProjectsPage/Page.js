import React, {PureComponent} from 'react';
import Project from '../../components/Project'
import JobsList from '../../containers/JobsList';
import ProjectsList from '../../containers/ProjectsList';

import './style.css'

class ProjectsPage extends PureComponent {
  render() {
    const { data, match } = this.props;
    console.log('data::', data)
    const projectName = match.params.projectName;
    const projects = [{link: "/project/yamsafer-backend/", name: "Yamsafer Backend"}]
    return (
      <div className="row">
        <div className="col-xs-4">
          <h1 className="title">Projects</h1>
          <ProjectsList />
        </div>
        <div className="col-xs-8">
          <h1 className="title">Jobs List</h1>
          <JobsList projectName={projectName} data={data}/>
        </div>
      </div>
    );
  }
}

export default ProjectsPage
