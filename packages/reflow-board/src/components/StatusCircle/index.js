import React from 'react';
import './style.css';

const matchStatus = function(status) {
  switch(status) {
    case 'SUCCESS': return 'success';
    case 'FAILURE': return 'fail';
    case 'PENDING': return 'pending';
    default: return '';
  }
}
const StatusCircle = ({status}) => <div className={`status-circle ${matchStatus(status)}`} />
export default StatusCircle
