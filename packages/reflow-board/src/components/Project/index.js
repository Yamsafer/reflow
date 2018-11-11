import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import StatusCircle from '../StatusCircle';

import './style.css';


const getProjectDetails = (project) => {
  // this is a hack, it must be contianed inside the graphQL project result
  const BACKEND = "cHJvamVjdF82MzY2OTc3NjU3ODMzMjYzMTA0";
  const B2C = "cHJvamVjdF82NDY3MzIyNDUxMjA1Mjk2MTI4";
  const IOS = "cHJvamVjdF82NDY3MzIyMzc2ODczODQwNjQw";
  if(project.id === BACKEND) {
    return 'yamsafer-backend / be-integration - Jenkins CI';
  }
  if(project.id === B2C) {
    return 'b2c / fe-e2e - Travis CI'
  }
  if(project.id === IOS) {
    return 'yamsafer-ios / native-e2e - Travis CI'
  }
  return ""
}

const Project = ({linkTo, project}) => {

  const jobDetails = getProjectDetails(project)
  return (
    <Link to={linkTo} type="button" className="btn btn-link job-card">
      <StatusCircle status={project.result} />
      <div className="card-id">{project.title}</div>
      <div className="job-details">{jobDetails}</div>
      {project.lastActive &&
        <div className="job-date">{moment(project.lastActive).fromNow()}</div>}
    </Link>
  )
}
export default Project
