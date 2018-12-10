import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

// Components
import App from './App.js';
import { Auth, LoginRegister } from './components/index.js';

const AuthComp = Auth(App)(LoginRegister);

ReactDOM.render(<AuthComp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();