import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { rootReducer } from './store/reducers';

// Not sure why this isn't working, must be due to an update
// const reduxDevToolsHook = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Setup Redux Store
const store = createStore(rootReducer, compose(applyMiddleware(thunk, logger)));

const rootElement = document.getElementById('root');
ReactDOM.render(
<Provider store={store}>
    <Router>
    <App />
    </Router>
    </Provider>,
rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
