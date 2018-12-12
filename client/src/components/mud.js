import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

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

    getPusher = () => {
	let pusher = new Pusher('c7c71740664c7237ae2d', {
	    cluster: 'us2',
	    forceTLS: true
	});
	const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
	console.log(`p-channel-${this.state.uuid}`);
	channel.bind('broadcast', data => {
	    alert('' + data.message);
	    this.setState({ data: data.message });
	    console.log(data);
	});
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
		// console.log(response);
		this.getPusher();
	    })
	    .catch(error => console.log(error));
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
	let entered = this.state.input;
	if (entered === 'n' || entered === 's' || entered === 'e' || entered === 'w') {
	    axios.post('https://agadkarimud.herokuapp.com/api/adv/move/', { direction: this.state.input }, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } })
		.then(response => {
		    console.log(response);
		    this.setState({
			error: ''
		    });
		    localStorage.setItem('token', response.data.key);
		    // this.props.history.push('/mud');
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
	} else {
        axios.post('https://agadkarimud.herokuapp.com/api/adv/say/', { message: this.state.input }, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } })
		.then(response => {
		    console.log(response);
		})
		.catch(err => console.log(err));
	}
    }

    render() {
	let {title} = this.state;
	let {description} = this.state;
	let {players} = this.state;
	let {username} = this.state;
	return(
	    <div className="Register">
	      <script src="https://js.pusher.com/4.3/pusher.min.js"></script>
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
		<button type="submit">Submit</button>
              </form>
	    </div>
	);
    }
}

export default Mud;
