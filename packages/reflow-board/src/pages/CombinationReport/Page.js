import React, {Component} from 'react';
import moment from 'moment';
import Suite from '../../components/Suite'

import './style.css'
class SuitesList extends Component {
  constructor(props) {
    super(props)
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
    const { data: {loading, error, combination }} = this.props;
    const {
      onlyFailures,
    } = this.state;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    const {
      suites,
      passes,
      pending,
      failures,
      endTime,
      startTime,
    } = combination;

    const ms = () => "";
    const checkedClass = onlyFailures? "active" : "";
    const hidePassesClass = onlyFailures? "hide-passes" : "";
    const overallResult = "UNKOWN"
    return (
      <div className="row">
        <div className="col-xs-4">
            {(failures > 0 || true) &&
              <div>
                <button
                  id="toggle-passes"
                  type="button"
                  onClick={this.onTogglePasses}
                  className={`btn btn-danger btn-xs toggle-passes ${checkedClass}`}
                >
                  show failures only
                </button>
              </div>
            }
            <h4>Details</h4>
              Result: {overallResult}
            <h4>Status</h4>
            <ul>
              <li className="passes">passes: <em>{passes}</em></li>
              <li className="pending">pending: <em>{pending}</em></li>
              <li className="failures">failures: <em>{failures}</em></li>
              <li className="duration">duration: <em>{ms(endTime - startTime)}</em></li>
            </ul>
          </div>
        <div className="col-xs-8">
          <div className={`report ${hidePassesClass}`} id="mocha">
            <div id="mocha">
              <ul id="report">{ suites.map((suite, i) => <Suite key={i} suite={suite} onlyFailures={onlyFailures}/>) }</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuitesList
