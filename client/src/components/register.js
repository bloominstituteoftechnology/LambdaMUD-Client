import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    id: 0,
	    username: '',
	    password: ''
	};
    }

    register = e => {
	e.preventDefault();
	
	this.setState({
	    username: '',
	    password: '',
	    password2: ''
	});
    }

    handleInputChange = e => {
	this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = event => {
	event.preventDefault();
	window.location.reload();

	axios.post('https://agadkarimud.herokuapp.com/api/registration/', {username: this.state.username, password: this.state.password})
	    .then(response => {
		console.log(response);
		console.log(response.data);
	    });	
    }

    render() {
	return(
	    <div className="Register">
              <h1>Create New Player:</h1>
              <form onSubmit={this.handleSubmit}>
		<input className='username'
		       onChange={this.handleInputChange}
		       placeholder="Username"
		       value={this.state.username}
		       name="username"
		       />
                <br/>
		<input className='password'
		       onChange={this.handleInputChange}
		       placeholder="Password"
		       value={this.state.password}
		       name="password"
		       />
                <br/>
		<input className='password'
		       onChange={this.handleInputChange}
		       placeholder="Enter Password Again"
		       value={this.state.password2}
		       name="password2"
		       />
		<br/>
		<button type="submit">Create</button>
              </form>
	    </div>
	);
    }
}

export default Register;
