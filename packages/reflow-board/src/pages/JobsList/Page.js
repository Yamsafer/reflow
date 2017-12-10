import React, {Component} from 'react';
import moment from 'moment';
import Job from '../../components/Job'
import JobDetails from '../../containers/JobDetails';

import './style.css'
class JobsList extends Component {
  constructor(props) {
    super(props);
    this.onJobSelect = this.onJobSelect.bind(this);
    this.state = {
      selectedJob: null,
    }
  }
  onJobSelect(jobID) {
    console.log(jobID)
    const newState = {
      selectedJob: jobID,
    };

    this.setState(() => newState);
  }
  render() {
    const { data: {loading, error, jobs }} = this.props;
    const {
      selectedJob,
    } = this.state;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <div className="row">
        <div className="col-xs-4">
          { jobs.map( job => <Job key={job.id} job={job} onClick={this.onJobSelect} />) }
        </div>
        <div className="col-xs-8">
          <JobDetails key={selectedJob} jobID={selectedJob} />
        </div>
      </div>
    );
  }
}

export default JobsList
