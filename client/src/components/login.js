import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
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
	    password: ''
	});
    }

    handleInputChange = e => {
	this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = event => {
	event.preventDefault();

	axios.post('https://agadkarimud.herokuapp.com/api/login/', {username: this.state.username, password: this.state.password})
	    .then(response => {
		console.log(response);
		this.setState({
		    error: ''
		});
		localStorage.setItem('token', response.data.key);
		this.props.history.push('/mud');
	    })
	    .catch(error => {
		if (Object.values(error.response.data)[0][0] === 'This field may not be blank.') {
		    this.setState({
			error: 'You need a password'
		    });
		} else {
		    this.setState({
			error: Object.values(error.response.data)[0][0]
		    });
		}
	    });
    }

    render() {
	return(
	    <div className="Register">
              <h1>Log In</h1>
              <form onSubmit={this.handleSubmit}>
		<input className='username'
		       onChange={this.handleInputChange}
		       placeholder="Username"
		       value={this.state.username}
		       name="username"
		       />
                <br/>
		<input className='password'
		       type='password'
		       onChange={this.handleInputChange}
		       placeholder="Password"
		       value={this.state.password}
		       name="password"
		       />
                <br/>
		<br/>
		<button type="submit">Submit</button>
              </form>
	    </div>
	);
    }
}

export default Login;
