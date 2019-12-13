import React, { useState } from "react";

import Form1 from "./forms/form1";
import Form2 from "./forms/form2";
import Form3 from "./forms/form3";

import "../styles/index.scss";
import { submitForm, createToast } from "./forms/actions";
import { connect } from "react-redux";

const Footer = () => <div className="d-flex footer">
  <span>#HelpingFarmersWin</span>
  <span>Build with Webpack, Heroku, React & Redux</span>
  <span><a target='_blank' href='https://github.com/vihangpatel/agrostar'></a>{"</> See Code"}</span>
</div>

const App = ({ form1Data, form2Data, form3Data }) => {

  const [loading, setLoading] = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    if (form3Data?.hobbies?.length === 0) {
      // check for hobbies length
      createToast({ message: "Select Hobbies", isSuccess: false });
      return;
    }

    setLoading(true);

    submitForm({ form1Data, form2Data, form3Data }).then(() =>
      setLoading(false)
    );
  };

  return (
    <div className="container d-flex flex-column">
      <div className="container__header">AGROSTAR, PUNE</div>
      <div className="container__form-section">
        <form onSubmit={onSubmit}>
          <Form1 />
          <Form2 />
          <Form3 />
          <div className="btn-group container__btn-group">
            <button type="submit">
              {" "}
              {loading ? (
                <span>
                  <div className="busy-loader"></div> Loading...{" "}
                </span>
              ) : (
                "SUBMIT"
              )}
            </button>
            <button className="transparent">CANCEL</button>
          </div>
        </form>
      </div>
      <div id="toast-container"></div>
      <Footer />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    form1Data: state?.form1?.data,
    form2Data: state?.form2?.data,
    form3Data: state?.form3?.data
  };
};

export default connect(mapStateToProps)(App);
