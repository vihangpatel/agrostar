import React, { useRef, useState, useEffect } from "react";

import { patchForm } from "./actions";
import { FormHeader } from "./common-components";
import { connect } from "react-redux";

const Form1 = ({ dispatch }) => {
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(true);
  const ageRef = useRef();
  const nameRef = useRef();

  const onButtonClick = () => {
    setLoading(true);
    patchForm(1, {
      age: ageRef.current.value,
      name: nameRef.current.value
    }).then(() => setLoading(false));
  };

  const putInStore = () => {
    dispatch({
      type: "SAVE_FORM_1",
      payload: {
        age: ageRef.current.value,
        name: nameRef.current.value
      }
    });
  };

  useEffect(() => {
    putInStore()
  }, [key])

  return (
    <div className="layer sub-form" key={key}>
      <FormHeader
        title="FORM 1"
        onSaveClick={onButtonClick}
        onClearClick={() => setKey(!key)}
        loading={loading}
      />

      <div className="d-flex form-row">
        <div className="input-field">
          <label>Full Name</label>
          <input type="text" required ref={nameRef} onChange={putInStore} />
        </div>
        <div className="input-field">
          <label>Select Age</label>
          <input
            ref={ageRef}
            type="number"
            className="small-input"
            min="0"
            max="150"
            required
            onChange={putInStore}
          />
          <div className="error">Age should be 0 to 150</div>
        </div>
      </div>
    </div>
  );
};

export default connect()(Form1);
