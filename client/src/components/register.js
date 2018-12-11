import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    username: '',
	    email: "",
	    password: '',
	    password2: ''	    
	};
    }

    register = e => {
	e.preventDefault();
	
	this.setState({
	    username: '',
	    email: "",
	    password1: '',
	    password2: ''
	});
    }

    handleInputChange = e => {
	this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = event => {
	event.preventDefault();
	//window.location.reload();
	console.log('attempting');
	axios.post('https://agadkarimud.herokuapp.com/api/registration/', this.state)
	    .then(response => {
		console.log(response);
		this.setState({
		    error: ''
		});
		localStorage.setItem('token', response.data.key);
		this.props.history.push('/mud');
	    })
	    .catch(error => {
		console.log(error.response.data);
		this.setState({
		    error: 'Try again'
		});
	    });
    };

    render() {
	return(
	    <div className="Register">
              <h1>Create New Player</h1>
              <form onSubmit={this.handleSubmit}>
		<input className='username'
		       onChange={this.handleInputChange}
		       placeholder="Username"
		       value={this.state.username}
		       name="username"
		       />
                <br/>
		<input className='email'
		       onChange={this.handleInputChange}
		       placeholder="Email"
		       value={this.state.email}
		       name="email"
		       />
                <br/>
		<input className='password1'
		       type='password'
		       onChange={this.handleInputChange}
		       placeholder="Password"
		       value={this.state.password1}
		       name="password1"
		       />
                <br/>
		<input className='password2'
		       type='password'
		       onChange={this.handleInputChange}
		       placeholder="Password Again"
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
