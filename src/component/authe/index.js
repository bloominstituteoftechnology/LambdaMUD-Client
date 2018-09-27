import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./login";
import axios from "axios";
class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			username: ""
		};
	}
	inputHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = method => {
		let { username, email, password } = this.state;
		// const url = "http://localhost:8800";
		const url = "https://sibhat-lambdamud.herokuapp.com";

		axios
			.post(`${url}/api/${method}/`, {
				username,
				email,
				password
			})
			.then(response => {
				localStorage.setItem("isLogedin", 1);
				localStorage.setItem("key", response.data.key);
				console.log(response.data);
				this.props.history.push("/game");
			})
			.catch(error => {
				console.log({ error });
				// this.props.history.push("/auth/");
			});
		this.setState({ username: "", email: "", password: "" });
	};
	render() {
		return (
			<React.Fragment>
				<Route
					exact
					path="/auth/login"
					render={props => (
						<Login
							login
							data={this.state}
							inputHandler={this.inputHandler}
							handleSubmit={this.handleSubmit}
							header="Login Form"
						/>
					)}
				/>
				<Route
					exact
					path="/auth/register"
					render={props => (
						<Login
							data={this.state}
							inputHandler={this.inputHandler}
							handleSubmit={this.handleSubmit}
							header="Create Account"
						/>
					)}
				/>
			</React.Fragment>
		);
	}
}

export default index;
