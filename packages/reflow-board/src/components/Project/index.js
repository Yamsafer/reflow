import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import StatusCircle from '../StatusCircle';

import './style.css';

const Project = ({link, project}) => {
  const date = moment(project.lastActive).fromNow()
  const jobDetails = 'yamsafer-backend / be-integration - Jenkins CI';
  return (
    <Link to={project.link} type="button" className="btn btn-link job-card">
      <StatusCircle status={project.result} />
      <div className="card-id">{project.name}</div>
      <div className="job-details">{jobDetails}</div>
      <div className="job-date">{date}</div>
    </Link>
  )
}
export default Project
