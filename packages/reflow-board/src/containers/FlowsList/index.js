import React from 'react';
import moment from 'moment';
import Flow from '../../components/Flow'
import ReactTable from 'react-table'
import columns from './columns';

import {isNonEmpty, getRelayData} from '../../util'

const JobsList = (props) => {
  const {loading, error, viewer } = props.data || {};
  if (error) return <p>{error.message}</p>;
  console.log('viewer::', viewer)
  const tableData = getRelayData(viewer, 'flows');
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
};

export default JobsList
