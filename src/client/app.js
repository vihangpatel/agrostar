import React from "react";

import Form1 from "./forms/form1";
import Form2 from "./forms/form2";
import Form3 from "./forms/form3";

import "../styles/index.scss";

const App = () => {

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className="container">
      <div className="container__header">AGROSTAR, PUNE</div>
      <div className="container__form-section">
        <form onSubmit={onSubmit}>
          <Form1 />
          <Form2 />
          <Form3 />
          <div className="btn-group container__btn-group">
            <button type="submit">SUBMIT</button>
            <button className="transparent">CANCEL</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
