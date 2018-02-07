import React from 'react';
const FailuresFilter = (props) => {
  const {
    active,
    onToggle,
    disabled,
    style,
  } = props;
  const checkedClass = active? "active" : "";

  if(!disabled) return null;

  return (
    <button
      id="toggle-passes"
      type="button"
      onClick={onToggle}
      style={style}
      className={`btn btn-danger btn-xs toggle-passes ${checkedClass}`}
    >
      show failures only
    </button>
  )
}

export default FailuresFilter
