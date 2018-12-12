import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
// import { compose } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { rootReducer } from './reducers';


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    // compose(
    //   applyMiddleware(thunk, logger),
    //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, 
    document.getElementById('root'));



