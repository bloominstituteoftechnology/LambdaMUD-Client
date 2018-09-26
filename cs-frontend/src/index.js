import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router';
import { Router } from 'react-router';
import createHashHistory from 'history/createHashHistory';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

ReactDOM.render(
  <Router history={hashHistory}>
    <App />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
