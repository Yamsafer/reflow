import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';


const Flow = ({flow}) => {
  console.log('flow::', flow)
  const date = moment(+flow.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a");

  return (
    <div>
      <Link to={`/flow/${flow.id}`}>{flow.id}</Link>
      <div>{flow.title}</div>
    </div>
  )
}
export default Flow
