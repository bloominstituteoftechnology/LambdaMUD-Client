import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

function App() {
	return (
		<div className="App">
			<Route exact path="/" render={(props) => <Login {...props} />} />
			<Route path="/register" render={(props) => <Register {...props} />} />
		</div>
	);
}

export default App;
