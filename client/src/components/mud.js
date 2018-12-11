import React, { Component } from 'react';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from "react-router-dom";

class Mud extends Component {
    state = {
	username: '',
	input: '',
	title: '',
	description: '',
	players: '',
	uuid: ''
    }

    componentDidMount() {
	this.startup();
    }

    startup = () => {
	const token = localStorage.getItem('token');
	const headers = {headers: {Authorization: `Token ${token}`}};
	console.log(headers);
	axios.get('https://agadkarimud.herokuapp.com/api/adv/init', headers)
	    .then(response => {
		this.setState({
		    username: response.data.name,
		    title: response.data.title,
		    description: response.data.description,
		    players: response.data.players,
		    uuid: response.data.uuid
		});
		console.log(response);
	    })
	    .catch(error => console.log(error));
    }
    
    
		// this.setState({
		//     username: res.data.name,
		//     title: res.data.title,
		//     description: res.data.description,
		//     players: res.data.players,
		//     uuid: res.data.uuid

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

	axios.post('https://agadkarimud.herokuapp.com/api/adv/init', {input: this.state.input})
	    .then(response => {
		console.log(response);
		this.setState({
		    error: ''
		});
		localStorage.setItem('token', response.data.key);
		this.props.history.push('/mud');
	    })
	    .catch(error => {
		if (Object.values(error.response.data)[0] == 'What\'s your input?') {
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
	let {title} = this.state;
	let {description} = this.state;
	let {players} = this.state;
	let {username} = this.state;
	return(
	    <div className="Register">
              <NavLink to='/logout'>Log Out</NavLink>
              <h1>MUD</h1>
              <div>
                <p>{title}</p>
                <p>{description}</p>
		<p>Room members: {players}</p>
		<p>{username} has joined the room</p>
		<p></p>
	      </div>
              <form id="myform" onSubmit={this.handleSubmit}>	
		<input className='input'
		       onChange={this.handleInputChange}
		       placeholder="Input"
		       value={this.state.input}
		       name="input"
		       />
                <br/>
		<button type="submit">Submit</button>
              </form>
	    </div>
	);
    }
}

export default Mud;
