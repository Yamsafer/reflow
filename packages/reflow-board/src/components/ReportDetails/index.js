import React from 'react';
const ms = _ => `${_}ms`;

const ReportDetails = (props) => {
  const {
    overallResult,
    passes,
    pending,
    failures,
    endTime,
    startTime,
  } = props;

  return (
    <div>
      <h4>Report Details</h4>
        Result: {overallResult}
      <h5>Status</h5>
      <ul>
        <li className="passes">passes: <em>{passes}</em></li>
        <li className="pending">pending: <em>{pending}</em></li>
        <li className="failures">failures: <em>{failures}</em></li>
        <li className="duration">duration: <em>{ms(endTime - startTime)}</em></li>
      </ul>
    </div>
  )
}

export default ReportDetails
