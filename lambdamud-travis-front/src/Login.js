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
				<h4 className="createHeader">Login</h4>
                <div className="inputFields">
                    <input className="usernameinput" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
                    <input className="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
				</div>
                <button className="connect" name="submit" onClick={this.handleSubmit}>Login</button>
                <button className="connect" onClick={this.props.toggleReg}>Register</button>
			</div>
		);
	}
}
