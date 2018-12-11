import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
	state = {
		username: '',
		password: ''
	};

	handleChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};
	handleSubmit = (e) => {
		const { username, password } = this.state;
		axios
			.post('https://lambdamud-backend-travis.herokuapp.com/api/login/', this.state)
			.then((res) => localStorage.setItem('Token', res.data.key))
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<div>
				<h1 className="loginHeader">Login</h1>
				<input name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
				<input name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
				<button name="submit" onClick={this.handleSubmit}>
					Connect
				</button>
			</div>
		);
	}
}
