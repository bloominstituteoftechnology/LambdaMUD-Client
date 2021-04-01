import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './Register.css';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password1: '',
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
		const URL = 'https://lambda-mud-test.herokuapp.com/api/registration/';
		axios
			.post(URL, {
				username: this.state.username,
				password1: this.state.password1,
				password2: this.state.password2
			})
			.then((res) => {
				console.log(res.data.key);
				// need to add token
				localStorage.setItem('authToken', res.data.key);
				this.setState({
					username: '',
					password1: '',
					password2: ''
				});
				// ^ clears fields after submit
				// sends user to login after registering
				this.props.history.push('/');
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<Container className="register">
				<h1>Register Here</h1>
				<Form className="form" onSubmit={this.register}>
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
								name="password1"
								type="password"
								placeholder="password"
								onChange={this.handleInput}
								value={this.state.password1}
							/>
						</Col>
					</FormGroup>
					<FormGroup>
						<Col>
							<Label>Confirm Password</Label>
							<Input
								name="password2"
								type="password"
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
					<Button color="primary">Register</Button>
				</Form>
			</Container>
		);
	}
}

export default Register;
