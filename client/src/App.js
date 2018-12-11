import React, { Component } from 'react';
import './App.css';
import Register from './components/register.js';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from "react-router-dom";

class App extends Component {
    state = {
	key: '',
	loggedon: false,
	registered: false
    }

    componentDidMount(){}

    render() {
	return (
            <div>
              <div>
		<NavLink to='/register'>Register</NavLink>
                <br/>
		<NavLink to='/register'>Login</NavLink>
		<Route exact path='/register' component={Register} />
	      </div>
	    </div>
	);
    }
}

export default App;
