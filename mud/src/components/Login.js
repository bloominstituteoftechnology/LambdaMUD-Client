import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		};
	}

	handleInput = (e) => {
		this.ListeningStateChangedEvent({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const URL = '';
		axios
			.post(URL, {
				username: this.state.username,
				password: this.state.password
			})
			.then((res) => {
				localStorage.setItem('token');
				// clears form
				this.setState({
					username: '',
					password: ''
				});
				this.PaymentResponse.history.push('');
			})
			.catch((err) => {
				alert('Enter Username and Password');
				this.setState({
					username: '',
					password: ''
				});
				console.log(err);
			});
	};

	render() {
		return (
			<div className="login">
				<h1 className="title">Run Fun</h1>
				<form className="form" onSubmit={this.handleSubmit}>
					<label>Username</label>
					<input
						name="username"
						type="text"
						placeholder="username"
						onChange={this.handleInput}
						value={this.state.username}
					/>
					<label>Passwords</label>
					<input
						name="password"
						type="text"
						placeholder="password"
						onChange={this.handleInput}
						value={this.state.password}
					/>
					<p>
						Don't have an account?
						<Link>Register</Link>
					</p>
					<button>Sign In</button>
				</form>
			</div>
		);
	}
}

export default Login;
