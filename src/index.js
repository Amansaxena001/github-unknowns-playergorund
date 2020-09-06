//store setup

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import gitReducer from "./reducers/gitReducer";
import { createStore } from "redux";

import "./index.css";
import App from "./App";

const store = createStore(gitReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
