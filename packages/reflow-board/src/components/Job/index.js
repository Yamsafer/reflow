import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';


const Job = ({job}) => {
  const date = moment(+job.creationDate).format("dddd, MMMM Do YYYY, h:mm:ss a");

  return (
    <div>
      <Link to={`/job/${job.id}`}>{job.id}</Link>
      <div>{date}</div>
    </div>
  )
}
export default Job
