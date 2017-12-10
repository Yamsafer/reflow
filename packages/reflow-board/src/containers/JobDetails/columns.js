import React from 'react';
import { Link } from 'react-router-dom';

export default [{
  Header: "Flow Title",
  accessor: "title",
}, {
  Header: "Details",
  accessor: "id",
  Cell: e =><Link to={`/flow/${e.value}`}>{"Click here"}</Link>
}]
