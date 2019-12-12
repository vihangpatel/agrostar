import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import { fetchGenders } from "./actions";
import { Radio, FormHeader } from "./common-components";

import { patchForm } from "./actions";

const Form2 = ({ genders, dispatch }) => {
  const [key, setKey] = useState(true);
  const [loading, setLoading] = useState(false);

  const addressRef = useRef();
  const radioRef = useRef();

  const onButtonClick = () => {
    setLoading(true);
    patchForm(2, {
      address: addressRef.current.value,
      gender: radioRef.current.querySelector('input').value
    }).then(() => setLoading(false));
  };

  const fetchData = () => {
    setLoading(true);
    fetchGenders(dispatch).then(() => setLoading(false));
  };

  useEffect(fetchData, []);
  return (
    <div className="layer sub-form" key={key}>
      <FormHeader
        title="FORM 2"
        onSaveClick={onButtonClick}
        onClearClick={() => setKey(!key)}
        loading={loading}
      />

      <div className="d-flex form-row">
        <div className="d-flex align-items-start input-field">
          <label>Address</label>
          <textarea rows={5} cols={50} required ref={addressRef}/>
        </div>
        <div className="d-flex input-field">
          <label>Select Gender</label>
          <div className="d-flex flex-column" ref={radioRef}>
            {genders.map(_ => (
              <Radio
                key={_.label}
                label={_.label}
                radioGroup="gender"
                required
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { genders: state.form2.genders || [] };
};

export default connect(mapStateToProps)(Form2);
