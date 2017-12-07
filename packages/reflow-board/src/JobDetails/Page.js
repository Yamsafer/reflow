import React from 'react';
import moment from 'moment';
import Flow from '../components/Flow'

const JobsList = ({ data: {loading, error, jobDetails }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>{jobDetails.map(flow => <Flow key={flow.id} flow={flow}/>)}</div>
  );
};

export default JobsList
