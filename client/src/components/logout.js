import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component {
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
	    input: ''
	});
    }

    handleInputChange = e => {
	this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = event => {
	event.preventDefault();

	axios.get('https://agadkarimud.herokuapp.com/api/logout/')
	    .then(response => {
		console.log(response);
		this.setState({
		    error: ''
		});
		//localStorage.setItem('token', response.data.key);
		// this.props.history.push('/mud');
	    })
	    .catch(error => {
		if (Object.values(error.response.data)[0] === 'What\'s your input?') {
		    this.setState({
			error: 'Couldn\'t understand that'
		    });
		} else {
		    this.setState({
			error: Object.values(error.response.data)[0]
		    });
		}
	    });
    }

    render() {
	return(
	    <div className="Logout">
              <h1>Log Out</h1>
              
              <form onSubmit={this.handleSubmit}>	
		<button type="submit">Exit</button>
              </form>
	    </div>
	);
    }
}

export default Logout;
