import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Game from './components/Game/Game';

function App() {
	return (
		<div className="App">
			<Route exact path="/" render={(props) => <Login {...props} />} />
			<Route path="/register" render={(props) => <Register {...props} />} />
			<Route path="/game" render={(props) => <Game {...props} />} />
		</div>
	);
}

export default App;
