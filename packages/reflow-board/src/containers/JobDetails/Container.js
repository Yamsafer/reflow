import React from 'react';
import moment from 'moment';
import Flow from '../../components/Flow'
import ReactTable from 'react-table'
import columns from './columns';

const JobsList = (props) => {
  const data =  props.data || {};
  const {loading, error, job } = data;
  if (error) return <p>{error.message}</p>;
  const tableData = job && job.flows || [];
  const pageSize = 15;

  return (
    <ReactTable
      loading={loading}
      noDataText={props.jobID ? 'Nothing reported yet.' : 'Select a Job!'}
      data={tableData}
      columns={columns}
      showPagination={tableData.length > pageSize}
      defaultPageSize={pageSize}
      showPageSizeOptions={false}
      sortable={false}
      style={{height: 'calc(100vh - 80px)'}}
      className="-striped -highlight"
    />
  )
  return (
    <div>{job.flows.map(flow => <Flow key={flow.id} flow={flow}/>)}</div>
  );
};

export default JobsList
