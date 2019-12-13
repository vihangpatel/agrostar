import React, { useState, useEffect, useRef } from "react";

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

export const Toast = ({ message, timeOut, onTimeout, error }) => {
  const toastRef = useRef();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // hide the class with animation
    const timer1 = setTimeout(() => {
      toastRef.current.classList.add("toast--hide");
    }, timeOut / 2 || 2500);

    // trigger unmount
    const timer2 = setTimeout(() => {
      setShow(false);
      setTimeout(() => onTimeout && onTimeout(), 1);
    }, timeOut || 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [message]);
  return show ? (
    <div className={`toast ${error ? "toast--error" : ""}`} ref={toastRef}>
      {message}
    </div>
  ) : null;
};
