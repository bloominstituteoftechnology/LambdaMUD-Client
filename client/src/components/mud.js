import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    withRouter
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
	// console.log(`p-channel-${this.state.uuid}`);
	channel.bind('broadcast', data => {
	    alert('' + data.message);
	    this.setState({ data: data.message });
	    console.log(data);
	    document.getElementById('windowpane').value += `\n ${data.message}`;
	});
	// document.getElementById('windowpane').value += `\n ${data.message}`;
    }

    startup = () => {
	const token = localStorage.getItem('token');
	const headers = {headers: {Authorization: `Token ${token}`}};
	// console.log(headers);
	axios.get('https://agadkarimud.herokuapp.com/api/adv/init', headers)
	    .then(response => {
		this.setState({
		    username: response.data.name,
		    title: response.data.title,
		    description: response.data.description,
		    players: response.data.players,
		    uuid: response.data.uuid,
		    message: response.data.message
		});
		// console.log(response);
		document.getElementById('windowpane').value = `\n ${response.data.title} \n ${response.data.description} \n \n room members: [${response.data.players}] \n ${response.data.name} joined the room`;
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
		    // console.log(response);
		    this.setState({
			error: ''
		    });
		    document.getElementById('windowpane').value = `\n ${response.data.title} \n ${response.data.description} \n \n room includes: ${response.data.players} \n ${response.data.name} joined the room`;
		})
		.catch(error => {
		    console.log(error.response);
		});
	    
	} else {
	    // event.preventDefault();
            axios.post('https://agadkarimud.herokuapp.com/api/adv/say/', { message: this.state.input }, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } })
		.then(response => {
		    // console.log(response);
		    this.setState({
			say: response.data.say
		    });
		    document.getElementById('windowpane').value += `\n ${response.data.name}: ${response.data.message}`;
		})
		.catch(err => console.log(err.response));
	}
    }

    render() {
	// let {title} = this.state;
	// let {description} = this.state;
	// let {players} = this.state;
	// let {username} = this.state;
	return(
	    <div className="Register">
              <h1>MUD</h1>
              <div>
                <textarea cols="70" id="windowpane" name="" rows="10" readOnly={true}>
                </textarea>
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
