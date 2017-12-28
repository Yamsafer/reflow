import React, {Component} from 'react';
import './style.css';
import he from 'he';

class Pass extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showCode: false,
    }
    this.toggleShowCode = this.toggleShowCode.bind(this);
  }
  toggleShowCode() {
    this.setState((currentState) => ({
      showCode: !currentState.showCode
    }))
  }
  render() {
    const {title, duration, speed, code} = this.props;
    const {showCode} = this.state;
    return (
      <li className={`test pass ${speed.toLowerCase()}`} onClick={this.toggleShowCode}>
        <h2>{title}<span className="duration">{duration}ms</span></h2>
        {!!code && showCode && <pre><code>{he.decode(code)}</code></pre>}
      </li>
    )
  }
}

const Pending = ({title}) => {
  return (
    <li className="test pass pending">
      <h2>{title}</h2>
    </li>
  )
}

const JSXERR = ({err}) => {
  if(!err) return <div />
  const stacktrace = !!err.stacktrace && he.decode(err.stacktrace);
  const message = !!err.message && he.decode(err.message);
  const htmlMessage = !!err.htmlMessage && he.decode(err.htmlMessage);

  if (htmlMessage && stacktrace) {
    return (
      <div className="html-error" dangerouslySetInnerHTML={htmlMessage}>
        <pre className="error">{stacktrace}</pre>
      </div>
    );
  } else if (htmlMessage) {
    return <div className="html-error">{htmlMessage}</div>
  } else if (message) {
    return <pre className="error">{message}{stacktrace}</pre>
  }
};

class Fail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCode: false,
    }
    this.toggleShowCode = this.toggleShowCode.bind(this);
  }
  toggleShowCode() {
    this.setState((currentState) => ({
      showCode: !currentState.showCode
    }))
  }
  render() {
    const {err, title, code, } = this.props
    const {showCode} = this.state;
    console.log("error code::", code)
    return (
      <li className="test fail" onClick={this.toggleShowCode} >
        <h2>{title}</h2>
        {showCode && code && <pre><code>{he.decode(code)}</code></pre>}
        {showCode && <JSXERR err={err} />}
      </li>
    )
  }
}
const decideComponent = (status) => {
  switch(status) {
    case "SUCCESS": return Pass;
    case "FAILURE": return Fail;
    case "PENDING": return Pending;
  }
}

const Suite = ({suite, onlyFailures}) => {

  const tests = suite.tests
    .filter(test => onlyFailures? test.result === "FAILURE" : true)
    .map((test, i) => {
      const Component = decideComponent(test.result);
      return <Component key={i} {...test} />
    });

  if(!tests.length) return null;

  return (
    <div>
      <li className="suite">
        <h1>{suite.title}</h1>
        <ul>
          {tests}
        </ul>
      </li>
    </div>
  )
}
export default Suite
