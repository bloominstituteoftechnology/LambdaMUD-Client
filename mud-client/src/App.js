import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import { Route } from 'react-router-dom';
import './App.css';

function App() {
	return (
		<div className="App">
			<Route exact path="/" render={(props) => <Login {...props} login={this.handleChange} />} />
			<Route path="/register" render={(props) => <Register {...props} register={this.handleChange} />} />
			<Route path="/game" component={Game} />
		</div>
	);
}

export default App;
