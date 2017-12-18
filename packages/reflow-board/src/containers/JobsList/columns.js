import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default [{
  Header: "Job ID",
  accessor: "id",
  Cell: e =><Link to={`job/${e.value}`}>{`Job #${e.value.substr(-6)}`}</Link>
}, {
  Header: "Result",
  accessor: "result",
}, {
  Header: "Target Branch",
  accessor: "targetBranch",
},{
  Header: "Start Time",
  accessor: "startTime",
  Cell: e => <div>{moment(e.value).fromNow()}</div>
}, {
  Header: "Expand",
  columns: [{
    expander: true,
    Header: () => <strong>More</strong>,
    width: 65,
    Expander: ({ isExpanded, ...rest }) =>
      <div>
        {isExpanded
          ? <span>&#x2299;</span>
          : <span>&#x2295;</span>}
      </div>,
    style: {
      cursor: "pointer",
      fontSize: 25,
      padding: "0",
      textAlign: "center",
      userSelect: "none"
    },
  }]
}];
