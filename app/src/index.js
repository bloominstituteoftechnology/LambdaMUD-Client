import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

if (isMobile == false) {
  window.resizeTo(600, 444)
}
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
