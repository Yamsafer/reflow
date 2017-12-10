import React, {Component} from 'react';
import './style.css';

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
    const {title, duration, speed, body} = this.props;
    const {showCode} = this.state;
    const code = body
    return (
      <li className={`test pass ${speed.toLowerCase()}`} onClick={this.toggleShowCode}>
        <h2>{title}<span className="duration">{duration}ms</span></h2>
        {!!code && showCode && <pre><code>{code}</code></pre>}
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
  const stacktrace = !!err && err.stacktrace;
  const message = !!err && err.message;
  const htmlMessage = !!err && err.htmlMessage;

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
  return <div />
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
    const {err, title, body, } = this.props
    const {showCode} = this.state;
    const code = body;

    return (
      <li className="test fail" onClick={this.toggleShowCode} >
        <h2>{title}</h2>
        {showCode && code && <pre><code>{code}</code></pre>}
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
