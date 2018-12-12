import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Header, LoginForm, RegisterForm, } from './index.js';

const StyledLoginRegister = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default class LoginRegister extends Component {
	state = { toggleForms: true };

	// toggles between showing the login and register form
	toggleForms = () => this.setState({ toggleForms: !this.state.toggleForms });

	// takes the username and password to use as credentials,
	// and returns an axios call that makes a post request to verify login
	handleLoginSubmit = e => {
		e.preventDefault();
		const username = e.target[0].value;
		const password = e.target[1].value;
		const credentials = { username, password };
		return axios
			.post(`${ this.props.backendURL }/api/login/`, credentials)
			.then(res => {
				const token = res.data.key;
				localStorage.setItem('lambdaMUDToken', token);
				this.props.handleLogin();
			})
			.catch(err => console.log(err.response));
	};

	// takes the username and passwords to use as credentials,
	// and returns an axios call that makes a post request to verify registration
	handleRegisterSubmit = e => {
		e.preventDefault();
		const username = e.target[0].value;
		const password1 = e.target[1].value;
		const password2 = e.target[2].value;
		const credentials = { username, password1, password2 };
		return axios
			.post(`${ this.props.backendURL }/api/registration/`, credentials)
			.then(res => {
				const token=res.data.key;
				localStorage.setItem('lambdaMUDToken', token);
				this.props.handleLogin();
			})
			.catch(err => console.log(err.response));
	};

	render() {
		const { toggleForms } = this.state;
		return (
			<StyledLoginRegister>
				<Header />
				{ toggleForms ?
					<LoginForm
						handleLoginSubmit={ this.handleLoginSubmit }
						toggleForms={ this.toggleForms }
					/> :
					<RegisterForm
						handleRegisterSubmit={ this.handleRegisterSubmit }
						toggleForms={ this.toggleForms }
					/>
				}
			</StyledLoginRegister>
		);
	}
}