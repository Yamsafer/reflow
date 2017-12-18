import React, {PureComponent} from 'react';
import ReactTable from 'react-table'
import columns from './columns';

class Container extends PureComponent {
  render() {
    const { data: {loading, error, jobs } } = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    return (
      <ReactTable
        style={{height: 'calc(100vh - 80px)'}}
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
                {!!original.sourceBranch && <div>Source Branch: {original.sourceBranch}</div>}
                {!!original.tags.length && <div>Tags: {original.tags.join(', ')}</div>}
              </div>
            </div>
          )
        }}
      />
    );
  }
}

export default Container
