import React from 'react';
import { Link } from 'react-router-dom';

const combinationNumber = {
  Header: "Combination #",
  accessor: "node.combinationNumber",
};
const status = {
  Header: "status",
  columns: [{
    Header: "Status",
    accessor: "node.result",
  },{
    Header: "Passes",
    accessor: "node.passes",
  },{
    Header: "Failures",
    accessor: "node.failures",
  }, {
    Header: "Pending",
    accessor: "node.pending",
  }]
}
const details = {
  Header: "Details",
  accessor: "node.id",
  Cell: e =><Link to={`/combination/${e.value}`}>{"Click here"}</Link>
}

export default [
  // combinationNumber,
  status,
  details,
];
