import React from "react";

const Radio = props => {
  return (
    <div className="ui-radio">
      <label className="label-wrap">
        <div className="radio-wrap">
          <input
            required={!!props.required}
            type="radio"
            className="radio-input"
            name={props.radioGroup}
          />
          <span className="custom-holder"></span>
        </div>
        <div className="label">{props.label}</div>
      </label>
    </div>
  );
};

export default Radio
