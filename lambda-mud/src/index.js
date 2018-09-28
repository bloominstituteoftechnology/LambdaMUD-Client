import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { rootReducer } from './reducers/index';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger))) ;


ReactDOM.render(
    <Provider store={ store }>
<Router>
    <Root />
    </Router>
    </Provider>, document.getElementById('root'));

