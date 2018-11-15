// index.js
// Base component, parent of App.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
    // Wrap App in Router
    <Router>
    <App />
    </Router>, document.getElementById('root'));

