import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

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
		// need endpoints from backend
		e.preventDefault();
		const URL = 'https://adv-project-hunterxhunter.herokuapp.com/api/register/';
		axios
			.post(URL, {
				username: this.state.username,
				password: this.state.password,
				confirmPassword: this.state.confirmPassword
			})
			.then((res) => {
				// need to add token
				localStorage.setItem('token');
				// clears fields
				this.setState({
					username: '',
					password: '',
					password2: ''
				});
				// sends user to login after registering
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
			<Container className="register">
				<h1>Register Here</h1>
				<Form className="form">
					<FormGroup>
						<Col>
							<Label>Username</Label>
							<Input
								name="username"
								type="text"
								placeholder="username"
								onChange={this.handleInput}
								value={this.state.username}
							/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col>
							<Label>Password</Label>
							<Input
								name="password"
								type="text"
								placeholder="password"
								onChange={this.handleInput}
								value={this.state.password}
							/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col>
							<Label>Confirm Password</Label>
							<Input
								name="password2"
								type="text"
								placeholder="Confirm password"
								onChange={this.handleInput}
								value={this.state.password2}
							/>
						</Col>
					</FormGroup>
					<p>
						Have an account?
						<Link to="/">Sign In</Link>
					</p>
					<Button>Register</Button>
				</Form>
			</Container>
		);
	}
}

export default Register;
