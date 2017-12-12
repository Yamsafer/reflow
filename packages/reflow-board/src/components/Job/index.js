import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import StatusCircle from '../StatusCircle';

import './style.css';

const Job = ({job, onClick}) => {
  const date = moment(job.startTime).fromNow()
  const idText = `Job #${job.id.substr(-6)}`;
  const jobDetails = `Yamsafer Backend (${job.targetBranch}) - ${job.trigger}`

  return (
    <button type="button" className="btn btn-link job-card" onClick={() => onClick(job.id)}>
      <StatusCircle status={job.result} />
      <div className="job-id">{idText}</div>
      <div className="job-details">{jobDetails}</div>
      <div className="job-date">{date}</div>
    </button>
  )
}
export default Job
