import React, {Component} from 'react';
import ReactTable from 'react-table'
import columns from './columns';
import ReportDetails from '../../components/ReportDetails';
import FailuresFilter from '../../components/FailuresFilter'

const decideOverallStatus = (combinationResults, failures) => {
  const isPending = combinationResults.some(result => result === "Pending");
  if(isPending) return "Pending";
  if(failures > 0) return "Failure"
  return "Success"
}

class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlyFailures: false,
    }
    this.onTogglePasses = this.onTogglePasses.bind(this);
  }
  onTogglePasses() {
    this.setState((currentState) => ({
      onlyFailures: !currentState.onlyFailures
    }))
  }
  render() {
    const { data: {loading, error, flow }} = this.props;
    const { onlyFailures } = this.state
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const {
      passes,
      pending,
      failures,
      endTime,
      startTime,
      combinations,
    } = flow;

    const combinationResults = combinations.map(combination => combination.result);
    const overallResult = decideOverallStatus(combinationResults, failures);

    const failureFilter = { id: 'result', value: 'FAILURE' };
    const filters = onlyFailures? [failureFilter]: [];

    return (
      <div className="row">
        <div className="col-xs-4">
          <h1 className="title">Flow Details</h1>
          <FailuresFilter
            active={onlyFailures}
            disabled={!failures}
            onToggle={this.onTogglePasses}
            style={{float: 'right'}}
          />
          <ReportDetails
            passes={passes}
            pending={pending}
            failures={failures}
            endTime={endTime}
            startTime={startTime}
            overallResult={overallResult}
          />
        </div>
        <div className="col-xs-8">
        <h1 className="title">Combinations</h1>
          <ReactTable
            filtered={filters}
            style={{height: 'calc(100vh - 130px)'}}
            data={combinations}
            columns={columns}
            defaultPageSize={20}
            className="-striped -highlight"
          />
        </div>
      </div>
    )
  }
}

export default JobsList
