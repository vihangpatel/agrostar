import React, { useEffect, useState, useCallback, useMemo } from "react";
import { connect } from "react-redux";

import { fetchHobbies } from "./actions";
import AutoComplete from "../selector";

const Form3 = ({ hobbies, dispatch }) => {
  const [loading, setLoading] = useState(false);
  const [selectedHobbies, setHobbies] = useState([]);

  const filterHobbiesMemo = useMemo(() => {
    return hobbies.filter(
      _ => selectedHobbies.filter(__ => __.label === _.label).length === 0
    );
  }, [hobbies, selectedHobbies]);

  const memoizedCallback = useCallback(() => {
    initializeAutoComplete(filterHobbiesMemo, {
      onSelect: setHobbies,
      key: "label",
      selectedHobbies
    });
  }, [hobbies, selectedHobbies]);

  const fetchData = () => {
    setLoading(true);
    fetchHobbies(dispatch).then(() => {
      setLoading(false);
    });
  };

  useEffect(memoizedCallback, [hobbies, selectedHobbies]);
  useEffect(fetchData, []);

  return (
    <div className="layer sub-form form-3">
      <div className="form-header">
        <span className="title">FORM 3</span>
        <div className="action-btn-group">
          <button type="button">Save</button>
          <button className="transparent">Clear</button>
        </div>
      </div>
      <div className="d-flex form-row">
        <div className="d-flex align-items-center input-field">
          <label>Select Your Hobbies</label>
          <div id="auto-complete-component"></div>
        </div>
        <div className="input-field">
          <label>Email Id</label>
          <input type="email" required />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { hobbies: state.form3.hobbies || [] };
};

const initializeAutoComplete = (
  data,
  { key: searchKey, onSelect, selectedHobbies }
) => {
  new AutoComplete({
    data,
    searchKey,
    placeHolder: "Hobby",
    clearOnSelection: true,
    selectedResult: selectedHobbies,
    selector: "#auto-complete-component",
    onSelect: ({ items }) => onSelect([...items]),
    pillTemplate: (item, index = 0) =>
      `<div class="selected-pill d-flex align-items-center">${item[searchKey]}</div>`,
    suggestionTemplate: (item, index = 0) =>
      `<div class="suggestion-item">${item[searchKey]}</div>`
  });
};

export default connect(mapStateToProps)(Form3);
