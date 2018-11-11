import React, {PureComponent} from 'react';
import ReactTable from 'react-table'
import columns from './columns';
import {isNonEmpty, getRelayData} from '../../util'

class JobsList extends PureComponent {
  render() {
    const data = this.props.data || { skipped: true };

    const {loading, viewer, error, skipped, refetch } = data;
    // console.log('refetch::', refetch)

    const tableData = getRelayData(viewer, 'jobs') || [];
    console.log('tableData::', tableData)
    const noDataText = skipped? 'Select a Project' : undefined;
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <ReactTable
        style={{height: 'calc(100vh - 130px)'}}
        loading={loading}
        noDataText={noDataText}
        data={tableData}
        columns={columns}
        defaultPageSize={15}
        className="-striped -highlight"
        showPageSizeOptions={false}
        sortable={false}
        // pages={13}
        // showPagination={tableData.length > pageSize}
        SubComponent={({original}) => {
          const {
            numberOfThreads,
            numberOfFlows,
            targetBranch,
            tags,
          } = original.node

          return (
            <div className="row">
              <div className="col-xs-6">
                <div># Threads: {numberOfThreads}</div>
                <div># Flows: {numberOfFlows}</div>
              </div>
              <div className="col-xs-6">
                {!!targetBranch && <div>Target Branch: {targetBranch}</div>}
                {isNonEmpty(tags) && <div>Tags: {tags.join(', ')}</div>}
              </div>
            </div>
          )
        }}
      />
    );
  }
}

export default JobsList
