import React from 'react';
import { Link } from 'react-router-dom';

export default [
  {
    Header: "Flow Title",
    accessor: "node.title",
  },
  {
    Header: "Details",
    columns: [{
      Header: "Result",
      accessor: "node.result"
    }, {
      Header: "Passes",
      accessor: "node.passes"
    }, {
      Header: "Failures",
      accessor: "node.failures"
    }, {
      Header: "Skipped",
      accessor: "node.pending"
    }]
  },
  {
    Header: "Details",
    accessor: "node.id",
    Cell: e =><Link to={`/flow/${e.value}`}>{"Click here"}</Link>
  },
]


