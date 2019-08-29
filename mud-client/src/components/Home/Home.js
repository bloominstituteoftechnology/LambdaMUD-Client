import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	render() {
		return (
			<div>
				<h1>Welcome to GameLand</h1>
				<Link to="/login">
					<button>Log In</button>
				</Link>
				<Link to="/register">
					<button>Register</button>
				</Link>
				<Link to="/game">
					<button>Play</button>
				</Link>
			</div>
		);
	}
}

export default Home;
