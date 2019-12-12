import React from "react";
import { Provider } from "react-redux";

import { createStore } from "redux";
import reducers from "./reducer";

import App from "./app";

const AppWithRedux = () => {
  const store = createStore(reducers);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithRedux;
