import React, {PureComponent} from 'react';
import ReactTable from 'react-table'
import columns from './columns';

class JobsList extends PureComponent {
  render() {
    const data = this.props.data || { skipped: true };

    const {loading, error, jobs, skipped } = data;
    const noDataText = skipped? 'Select a Project' : undefined;
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <ReactTable
        style={{height: 'calc(100vh - 130px)'}}
        loading={loading}
        noDataText={noDataText}
        data={jobs}
        columns={columns}
        defaultPageSize={15}
        className="-striped -highlight"
        showPageSizeOptions={false}
        sortable={false}
        // pages={13}
        // showPagination={tableData.length > pageSize}
        SubComponent={({original}) => {
          return (
            <div className="row">
              <div className="col-xs-6">
                <div># Threads: {original.numberOfThreads}</div>
                <div># Flows: {original.numberOfFlows}</div>
              </div>
              <div className="col-xs-6">
                {!!original.targetBranch && <div>Target Branch: {original.targetBranch}</div>}
                {!!original.tags.length && <div>Tags: {original.tags.join(', ')}</div>}
              </div>
            </div>
          )
        }}
      />
    );
  }
}

export default JobsList
