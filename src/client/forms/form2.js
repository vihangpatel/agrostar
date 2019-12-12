import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchGenders } from "./actions";
import Radio from "./radio";

const Form2 = ({ genders, dispatch }) => {
  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    fetchGenders(dispatch).then(() => setLoading(false));
  };

  useEffect(fetchData, []);
  return (
    <div className="layer sub-form">
      <div className="form-header">
        <span className="title">FORM 2</span>
        <div className="action-btn-group">
          <button type="button">Save</button>
          <button type="submit" className="transparent">Clear</button>
        </div>
      </div>
        <div className="d-flex form-row">
          <div className="d-flex align-items-start input-field">
            <label>Address</label>
            <textarea rows={5} cols={50} required/>
          </div>
          <div className="d-flex input-field">
            <label>Select Gender</label>
            <div className="d-flex flex-column">
              {genders.map(_ => (
                <Radio key={_.label} label={_.label} radioGroup="gender" required/>
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
