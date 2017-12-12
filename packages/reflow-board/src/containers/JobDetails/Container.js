import React from 'react';
import moment from 'moment';
import Flow from '../../components/Flow'
import ReactTable from 'react-table'
import columns from './columns';

const JobsList = (props) => {
  const data =  props.data || {};
  const {loading, error, job= {flows: []} } = data;
  if (error) return <p>{error.message}</p>;
  const tableData = job.flows;
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
        style={{height: 'calc(100vh - 200px)'}}
        className="-striped -highlight"
      />
      {props.jobID && <div style={{height: 120}}>
        <h4>Job Details</h4>
        <div className="row">
          <div className="col-xs-6">
            <ul>
              <li>Target Branch: {job.targetBranch}</li>
              <li>Trigger: {job.trigger}</li>
            </ul>
          </div>
          <div className="col-xs-6">
            <ul>
              <li># Threads: {job.numberOfThreads}</li>
              <li># Flows: {job.numberOfFlows}</li>
            </ul>
          </div>
        </div>
      </div> }
    </div>
  )
  return (
    <div>{job.flows.map(flow => <Flow key={flow.id} flow={flow}/>)}</div>
  );
};

export default JobsList
