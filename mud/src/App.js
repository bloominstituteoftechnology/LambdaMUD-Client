import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
	return (
		<div className="App">
			<Route exact path="/" render={(props) => <Login {...props} />} />
		</div>
	);
}

export default App;
