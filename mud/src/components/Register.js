import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			password2: ''
		};
	}
	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	register = (e) => {
		e.preventDefault();
		const URL = '';
		axios
			.post(URL, {
				username: this.state.username,
				password: this.state.password,
				confirmPassword: this.state.confirmPassword
			})
			.then((res) => {
				localStorage.setItem('token');
				this.setState({
					username: '',
					password: '',
					password2: ''
				});
				this.props.history.push('/');
			})
			.catch((err) => {
				alert('Passwords must match');
				this.setState({
					username: '',
					password: '',
					password2: ''
				});
				console.log(err);
			});
	};

	render() {
		return (
			<div className="register">
				<h1>Register Here</h1>
				<form className="form">
					<label>Username</label>
					<input
						name="username"
						type="text"
						placeholder="username"
						onChange={this.handleInput}
						value={this.state.username}
					/>
					<label>Password</label>
					<input
						name="password"
						type="text"
						placeholder="password"
						onChange={this.handleInput}
						value={this.state.password}
					/>
					<label>Password</label>
					<input
						name="password2"
						type="text"
						placeholder="Confirm password"
						onChange={this.handleInput}
						value={this.state.password2}
					/>
					<button>Register</button>
				</form>
				<p>
					Have an account?
					<Link to="/">Sign In</Link>
				</p>
			</div>
		);
	}
}

export default Register;
