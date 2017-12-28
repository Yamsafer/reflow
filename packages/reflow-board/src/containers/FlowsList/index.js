import React from 'react';
import moment from 'moment';
import Flow from '../../components/Flow'
import ReactTable from 'react-table'
import columns from './columns';

const JobsList = (props) => {
  const {loading, error, flows } = props.data || {};
  if (error) return <p>{error.message}</p>;
  const tableData = (flows || []).map(flow => flow);
  const pageSize = 15;

  return (
    <div>
      <ReactTable
        loading={loading}
        noDataText={props.jobID ? 'Nothing reported yet.' : 'Select a Job!'}
        data={tableData}
        columns={columns}
        showPagination={tableData.length > pageSize}
        defaultPageSize={pageSize}
        showPageSizeOptions={false}
        sortable={false}
        style={{height: 'calc(100vh - 130px)'}}
        className="-striped -highlight"
      />
    </div>
  )
  return (
    <div>{flows.map((flow, i) => <Flow key={i} flow={flow}/>)}</div>
  );
};

export default JobsList
