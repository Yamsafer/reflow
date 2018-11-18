import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default [{
  Header: "Job ID",
  accessor: "node.id",
  Cell: e =><Link to={`/job/${e.value}`}>{`Job #${e.value.substr(-6)}`}</Link>
}, {
  Header: "Result",
  accessor: "node.result",
}, {
  Header: "Source Branch",
  accessor: "node.sourceBranch",
},{
  Header: "Start Time",
  accessor: "node.startTime",
  Cell: e => <div>{moment(e.value).fromNow()}</div>
}, {
  Header: "Expand",
  columns: [{
    expander: true,
    Header: () => <strong>More</strong>,
    width: 65,
    Expander: ({ isExpanded, ...rest }) =>
      <div>
        <span dangerouslySetInnerHTML={{__html: isExpanded? '&#x2299;' : '&#x2295;'}} />
      </div>,
    style: {
      cursor: "pointer",
      fontSize: 25,
      textAlign: "center",
      userSelect: "none"
    },
  }]
}];
