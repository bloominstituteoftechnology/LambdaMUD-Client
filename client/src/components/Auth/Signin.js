import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Contain, MainH1, FlexForm, BTN, SubmitBtn, BTNDiv, LogErr } from '../../css';


class Signin extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			failedLogin: '',
		};
	}

	handleChange = event => {
 	   this.setState({[event.target.name]: event.target.value})
 	}

 	signin = event => {
 		event.preventDefault();
 		let signin_attempt = {username: this.state.username, password: this.state.password}

 		axios.post('https://lambda-dungeon.herokuapp.com/api/login/', signin_attempt)
 		.then(response => {
 			console.log(response.data)
 			this.setState({
 				failedLogin: ''
 			})
 			localStorage.setItem('token', response.data.key);
 			this.props.history.push('/mud')
 		})
 		.catch(error => {
 			let e = error.response.data
 			let e_obj = Object.values(e)[0][0]
 			console.log(e_obj)
 			if (e_obj === 'This field may not be blank.'){
	 			this.setState({
	 				failedLogin: 'password field blank.'
	 			})
 			} else {
 				this.setState({
 					failedLogin: e_obj
 				})
 			}

 		})
 	}

 	clear = event => {
 		localStorage.removeItem('error');
 	}

	render() {
		return (
			<div>
				<Contain>
					<MainH1>Log In</MainH1>
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
						<SubmitBtn onClick={this.signin}>Signin</SubmitBtn>
					</FlexForm>

				</Contain>
				<Link to='/signup'><BTNDiv onClick={this.clear}><BTN>No account Sign up here!</BTN></BTNDiv></Link>
				<LogErr>{this.state.failedLogin}</LogErr>
			</div>
		)
	}
}

export default Signin;