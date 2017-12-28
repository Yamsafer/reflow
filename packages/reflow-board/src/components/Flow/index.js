import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';


const Flow = ({flow}) => {
  const date = moment(+flow.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a");

  return (
    <div>
      {flow.title}: <Link to={`/flow/${flow.id}`}>{flow.id}</Link>
    </div>
  )
}
export default Flow
