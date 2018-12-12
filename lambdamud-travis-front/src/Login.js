import React from 'react';

export default class Login extends React.Component {
	state = {
		username: '',
		password: ''
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
    };
    
	handleSubmit = (e) => {
        e.preventDefault()
        this.props.login({
          "username": this.state.username,
          "password": this.state.password
        })
        this.setState({
          username: "",
          password: "",
        })
	};

	render() {
		return (
			<div>
				<h1 className="loginHeader">Login</h1>
				<input name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
				<input name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
				<button name="submit" onClick={this.handleSubmit}>
					Login
				</button>
			</div>
		);
	}
}
