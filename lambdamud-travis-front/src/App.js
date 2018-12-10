import React, { Component } from 'react';
import './App.css';
import MainScreen from './MainScreen';
import CreateAccount from './CreateAccount';
import Login from './Login';

class App extends Component {
	state = {
		key: '',
		loggedIn: false,
		registered: false
	};

	render() {
		if (this.state.loggedIn && this.state.registered) {
			return <MainScreen />;
		} else if (!this.state.registered) {
			return <CreateAccount />;
		} else if (!this.state.loggedIn) {
			return <Login />;
		}
	}
}

export default App;
