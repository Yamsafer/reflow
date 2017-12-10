import React from 'react';
import { Link } from 'react-router-dom';

const combinationNumber = {
  Header: "Combination #",
  accessor: "combinationNumber",
};
const status = {
  Header: "status",
  columns: [{
    Header: "Status",
    accessor: "result",
  },{
    Header: "Passes",
    accessor: "passes",
  },{
    Header: "Failures",
    accessor: "failures",
  }, {
    Header: "Pending",
    accessor: "pending",
  }]
}
const details = {
  Header: "Details",
  accessor: "id",
  Cell: e =><Link to={`/combination/${e.value}`}>{"Click here"}</Link>
}

export default [
  combinationNumber,
  status,
  details,
];
