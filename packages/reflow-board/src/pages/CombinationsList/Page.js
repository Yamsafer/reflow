import React, {Component} from 'react';
import ReactTable from 'react-table'
import columns from './columns';


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
    const ms = () => {}




    const combinationResults = combinations.map(combination => combination.result);
    const overallResult = decideOverallStatus(combinationResults, failures);

    const checkedClass = onlyFailures? "active" : "";
    const failureFilter = { id: 'result', value: 'FAILURE' };
    const filters = onlyFailures? [failureFilter]: [];

    return (
      <div className="row">
        <div className="col-xs-4">
          <h1 className="title">Flow Details</h1>
          {(failures > 0 || true) &&
            <div>
              <button
                id="toggle-passes"
                type="button"
                onClick={this.onTogglePasses}
                style={{float: 'right'}}
                className={`btn btn-danger btn-xs toggle-passes ${checkedClass}`}
              >
                show failures only
              </button>
            </div>
          }

            Result: {overallResult}
          <h5>Status</h5>
          <ul>
            <li className="passes">passes: <em>{passes}</em></li>
            <li className="pending">pending: <em>{pending}</em></li>
            <li className="failures">failures: <em>{failures}</em></li>
            <li className="duration">duration: <em>{ms(endTime - startTime)}</em></li>
          </ul>
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
