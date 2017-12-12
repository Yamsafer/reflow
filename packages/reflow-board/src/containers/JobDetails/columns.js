import React from 'react';
import { Link } from 'react-router-dom';

export default [
  {
    Header: "Flow Title",
    accessor: "title",
  },
  {
    Header: "Details",
    columns: [{
      Header: "Result",
      accessor: "result"
    }, {
      Header: "Passes",
      accessor: "passes"
    }, {
      Header: "Failures",
      accessor: "failures"
    }, {
      Header: "Skipped",
      accessor: "pending"
    }]
  },
  {
    Header: "Details",
    accessor: "id",
    Cell: e =><Link to={`/flow/${e.value}`}>{"Click here"}</Link>
  },
]


