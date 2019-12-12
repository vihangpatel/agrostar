import React from "react";

export const Radio = props => {
  return (
    <div className="ui-radio">
      <label className="label-wrap">
        <div className="radio-wrap">
          <input
            required={!!props.required}
            type="radio"
            className="radio-input"
            name={props.radioGroup}
            value={props.label}
          />
          <span className="custom-holder"></span>
        </div>
        <div className="label">{props.label}</div>
      </label>
    </div>
  );
};

export const FormHeader = ({ title, loading, onSaveClick, onClearClick }) => (
  <div className="form-header">
    <span className="title">{title}</span>
    <div className="action-btn-group d-flex">
      <button type="button" onClick={onSaveClick}>
        {loading ? (
          <span>
            <div className="busy-loader"></div> Loading...{" "}
          </span>
        ) : (
          "Save"
        )}
      </button>
      <button type="button" className="transparent" onClick={onClearClick}>
        Clear
      </button>
    </div>
  </div>
);
