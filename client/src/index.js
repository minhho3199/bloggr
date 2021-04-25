import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Application } from "react-rainbow-components";
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import history from "./components/utils/history";

const theme = {
  rainbow: {
    palette: {
      brand: "#1987ea",
      mainBackground: "#ffffff"
    }
  }
};

ReactDOM.render(
  <Provider store={store}>
    <Application theme={theme}>
      <Router history={history}>
        <App />
      </Router>
    </Application>
  </Provider>
  , document.getElementById('root'));
