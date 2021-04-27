import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Application } from "react-rainbow-components";
import { Provider } from 'react-redux';
import store from './redux/store';

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
      <App />
    </Application>
  </Provider>
  , document.getElementById('root'));
