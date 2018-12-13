import React from 'react';

export default class CreateAccount extends React.Component {
	state = {
		username: '',
		password1: '',
		password2: ''
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.password1 !== this.state.password2) {
            alert('Passwords do not match')
        }
        else if (this.state.password1.length < 9 || this.state.password2.length < 9) {
            alert('Password must be 8 characters minimum')
        }
        else {
            this.props.createAcc({
                "username": this.state.username,
                "password1": this.state.password1,
                "password2": this.state.password2,
            });
        }
        this.setState({
            username: "",
            password1: "",
            password2: "",
        })
	};


	render() {
		return (
			<div>
				<h1 className="createHeader">Create Account</h1>
				<div className="inputFields">
					<input className="usernameinput" name="username" placeholder="username" value={this.state.username} onChange={this.handleChange} />
					<input className="password" name="password1" placeholder="password1" value={this.state.password1} onChange={this.handleChange} />
					<input className="password" name="password2" placeholder="password2" value={this.state.password2} onChange={this.handleChange} />
				</div>
				<button className="connect" onClick={this.handleSubmit}>Create</button>
				<button className="connect" onClick={this.props.toggleReg}>Login</button>
			</div>
		);
	}
}
