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
			error: localStorage.getItem("error"),
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
 			console.log(error.response.data)
 			this.setState({
 				failedLogin: "You have failed to log in"
 			})
 		})
 	}

 	clear = event => {
 		localStorage.removeItem('error');
 	}

	render() {
		return (
			<div>
				<LogErr>{this.state.error}</LogErr>
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