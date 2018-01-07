import React, {Component} from 'react';
import './style.css';
import he from 'he';

const CodeAndMetadata = ({code, metadata}) => {
  const metaItems = metadata && metadata.map(metaItem => {
    return (
      <pre>
        {metaItem.message && <code>message: {metaItem.message}</code>}
        {metaItem.meta && <code>meta: {metaItem.meta}</code>}
      </pre>
    )
  });
  return (
    <div>
      <pre>
        {!!code && <code>{he.decode(code)}</code>}
      </pre>
      {metaItems}
    </div>
  )
}
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
    const {title, duration, speed, code, metadata} = this.props;
    const {showCode} = this.state;
    return (
      <li className={`test pass ${speed.toLowerCase()}`} onClick={this.toggleShowCode}>
        <h2>{title}<span className="duration">{duration}ms</span></h2>
        {showCode && <CodeAndMetadata code={code} metadata={metadata} />}
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
    const {err, title, code, metadata, } = this.props
    const {showCode} = this.state;
    console.log("error code::", code)
    return (
      <li className="test fail" onClick={this.toggleShowCode} >
        <h2>{title}</h2>
        {showCode && <CodeAndMetadata code={code} metadata={metadata} />}
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

const Heading = ({level, title}) => {
  const cx = `suite-level-${level}`;

  switch(level) {
    case 1:
      return <h1 className={cx}>{title}</h1>;
    case 2:
      return <h2 className={cx}>{title}</h2>;
    case 3:
      return <h3 className={cx}>{title}</h3>;
    case 4:
      return <h4 className={cx}>{title}</h4>;
    default:
      return <h5 className={cx}>{title}</h5>;
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
      <li className={`suite suite-level-${suite.level}`}>
        <h1>{suite.title}</h1>
        <ul>
          {tests}
        </ul>
      </li>
    </div>
  )
}
export default Suite
