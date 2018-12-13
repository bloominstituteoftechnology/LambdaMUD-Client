import React, { Component } from 'react';
import './App.css';
import Register from './components/register.js';
import Login from './components/login.js';
import Mud from './components/mud.js';
import Logout from './components/logout.js';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    withRouter
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
		<NavLink to='/login'>Login</NavLink>
		<Route exact path='/register' component={Register} />
		<Route exact path='/login' component={Login} />
		<Route exact path='/mud' component={Mud} />
	      </div>
	    </div>
	);
    }
}

export default withRouter(App);

//<Route exact path='/logout' component={Logout} />
