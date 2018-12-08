import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Contain, MainH1, FlexForm, BTN, SubmitBtn, BTNDiv, Errors } from './css';

class SignUp extends React.Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
			passwordConfirmation: '',
			error: '', 
		};
	}

	handleChange = event => {
 	  this.setState({[event.target.name]: event.target.value})
 	}

 	register = event => {
 		event.preventDefault()

 		const newUser = {
 			username: this.state.username,
 			password1: this.state.password,
 			password2: this.state.passwordConfirmation
 		}

	 	axios.post('https://lambda-dungeon.herokuapp.com/api/registration/', newUser)
	 		.then(response => {
	 			console.log(response)
	 			// localStorage.setItem('jwt', response.data.token);
	 			// localStorage.setItem('loggedInAs', this.state.username);
	 			this.setState({
	 				error: ''
	 			})
	 			this.props.history.push('/mud')
	 		})
	 		.catch(error => {
	 			console.log(error.response.data)

	 			this.setState({
	 				error: 'Failed Sign Up'
	 			})

	 		})

 	}

	render() {
		return (
			<div>
				<Contain>
					<MainH1>Sign Up Below</MainH1>
					<FlexForm>
						<input
							type="text"
							placeholder='username'
							onChange={this.handleChange}
							name="username"
							value={this.state.username}
						/>
						<input
							type="password"
							placeholder='password'
							onChange={this.handleChange}
							name="password"
							value={this.state.password}
						/>
						<input
							type="password"
							placeholder='password confirmation'
							onChange={this.handleChange}
							name="passwordConfirmation"
							value={this.state.passwordConfirmation}
						/>
						<SubmitBtn onClick={this.register}>Submit</SubmitBtn>
					</FlexForm>
				</Contain>
				<Link to='/signin'><BTNDiv><BTN>Need to go back click here!</BTN></BTNDiv></Link>
				<Errors>
					<p>{this.state.error}</p>
				</Errors>
			</div>
		)
	}
}

export default SignUp;

