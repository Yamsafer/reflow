import React from 'react';
import moment from 'moment';

const JobsList = ({ data: {loading, error, flowDetails }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  console.log('flowDetails::', flowDetails)

  return (
    <div>
      <div>{flowDetails.id}</div>
      <div>{flowDetails.title}</div>
    </div>
  );
};

export default JobsList
