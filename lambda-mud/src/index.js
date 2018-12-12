import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root')
);

// Landing page with registratioin and login forms

    // Route and link to Registration page
        // Display Registration form for new players
        // connect registration form to API
        // registration triggers redirect to landing page

    // Route and link to Login page
        // Display Login form for existing users
        // connect login form to API
        // login triggers redirect to page with 'start new game' button



// start new game page displays button to start a new game

// New game:

// Display current room description and player status, inventory, etc.

// Display player Move input form 
// link Move input form to Move API 
// connect to pusher broadcast

// Display player Say input form
// link Say input form to Say API
// connect to pusher broadcast
