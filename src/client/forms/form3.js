import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef
} from "react";
import { connect } from "react-redux";
import { FormHeader } from "./common-components";

import { fetchHobbies } from "./actions";
import AutoComplete from "../selector";

import { patchForm } from "./actions";

const Form3 = ({ hobbies, dispatch }) => {
  const [key, setKey] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedHobbies, setHobbies] = useState([]);

  const emailRef = useRef();

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
    putInStore()
  }, [hobbies, selectedHobbies]);

  const onButtonClick = () => {
    setLoading(true);
    patchForm(3, {
      hobbies: [...selectedHobbies],
      email: emailRef.current.value
    }).then(() => setLoading(false));
  };

  const fetchData = () => {
    setLoading(true);
    fetchHobbies(dispatch).then(() => {
      setLoading(false);
    });
  };

  useEffect(memoizedCallback, [hobbies, selectedHobbies]);
  useEffect(fetchData, []);
  useEffect(() => {
    putInStore()
  }, [key])

  const putInStore = () => {
    dispatch({
      type: "SAVE_FORM_3",
      payload: {
        hobbies: [...selectedHobbies],
        email: emailRef.current.value
      }
    });
  };

  return (
    <div className="layer sub-form form-3" key={key}>
      <FormHeader
        title="FORM 3"
        onSaveClick={onButtonClick}
        onClearClick={() => {
          setHobbies([]);
          setKey(!key);
        }}
        loading={loading}
      />
      <div className="d-flex form-row">
        <div className="d-flex align-items-center input-field">
          <label>Select Your Hobbies</label>
          <div id="auto-complete-component"></div>
        </div>
        <div className="input-field">
          <label>Email Id</label>
          <input type="email" required ref={emailRef} onChange={putInStore}/>
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
