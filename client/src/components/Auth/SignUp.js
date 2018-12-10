import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Contain, MainH1, FlexForm, BTN, SubmitBtn, BTNDiv, Errors } from '../../css';

class SignUp extends React.Component {
	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
			passwordConfirmation: '',
			error1: '', 
			error2: '',
			error3: '',
			error4: '',
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
	 			this.setState({
	 				error: ''
	 			})
	 			localStorage.setItem('token', response.data.key);
	 			this.props.history.push('/mud')
	 		})
	 		.catch(error => {
	 			console.log(error.response.data)

	 			this.setState({
			 		error1: '', 
					error2: '',
					error3: '',
	 			})

	 			if (error.response.data.username){
	 				this.setState({
	 					error1: `username: ${error.response.data.username[0]}`
	 				})
	 			}

	 			if (error.response.data.password1){
		 			this.setState({
		 				error2: `password: ${error.response.data.password1[0]}`
		 			})
	 			}

	 			if (error.response.data.password2){
	 				this.setState({
	 					error3: `password confirmation: ${error.response.data.password2[0]}`
	 				})
	 			}

	 			if (error.response.data.non_field_errors){
	 				this.setState({
	 					error4: error.response.data.non_field_errors[0]
	 				})
	 			}

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
				<Link to='/'><BTNDiv><BTN>Need to go back click here!</BTN></BTNDiv></Link>
				<Errors>
					<p>{this.state.error1}</p>
					<p>{this.state.error2}</p>
					<p>{this.state.error3}</p>
					<p>{this.state.error4}</p>
				</Errors>
			</div>
		)
	}
}

export default SignUp;

