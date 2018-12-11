import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import orderReducer from './reducer/reducer';
import { configurePusher } from 'pusher-redux';
const state = createStore(orderReducer)

const options = {
cluster: 'us2',
forceTLS: true,
}

const store = configurePusher(state, '7634fda7a281ae14b075', options)

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));