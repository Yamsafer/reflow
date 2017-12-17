import React, {PureComponent} from 'react';
import moment from 'moment';
import Job from '../../components/Job'
import FlowsList from '../../containers/FlowsList';

import './style.css'
class JobsList extends PureComponent {
  render() {
    const { data: {loading, error, jobs }, match} = this.props;
    const projectName = match.params.projectName;
    const selectedJobID = match.params.jobID;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <div className="row">
        <div className="col-xs-4">
          { jobs.map( job => <Job key={job.id} job={job} link={`/project/${projectName}/job/${job.id}`} />) }
        </div>
        <div className="col-xs-8">
          <FlowsList key={selectedJobID} jobID={selectedJobID} />
        </div>
      </div>
    );
  }
}

export default JobsList
