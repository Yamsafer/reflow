import React from 'react';
import moment from 'moment';
import Job from '../components/Job'

const JobsList = ({ data: {loading, error, jobs }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      { jobs.map( job => <Job key={job.id} job={job} />) }
    </div>
  );
};

export default JobsList
