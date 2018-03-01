import React, {Component} from 'react';
import moment from 'moment';
import Suite from '../../components/Suite'
import FailuresFilter from '../../components/FailuresFilter'
import ReportDetails from '../../components/ReportDetails';

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
    const { data: {loading, error, viewer }} = this.props;
    const {
      onlyFailures,
    } = this.state;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }

    // const {
    //   suites,
    //   passes,
    //   pending,
    //   failures,
    //   endTime,
    //   startTime,
    // } = combination;
    const {
      suites,
    } = viewer;

    const hidePassesClass = onlyFailures? "hide-passes" : "";
    const overallResult = "UNKOWN"
    return (
      <div className="row">
        <div className="col-xs-4">
          {/*<FailuresFilter
            active={onlyFailures}
            disabled={!failures}
            onToggle={this.onTogglePasses}
          />
          <ReportDetails
            passes={passes}
            pending={pending}
            failures={failures}
            endTime={endTime}
            startTime={startTime}
            overallResult={overallResult}
          />*/}
        </div>
        <div className="col-xs-8">
          <div className={`report ${hidePassesClass}`} id="mocha">
            <div id="mocha">
              <ul id="report">{ suites.edges.map((edge, i) => <Suite key={i} suite={edge.node} onlyFailures={onlyFailures}/>) }</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuitesList
