import React from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import Chat from './Chat';
import Movement from './Movement';

export default class MainScreen extends React.Component {
	state = {
		title: "",
		description: "",
		players: [],
		chat: [],
		uuid: null,
	};

	componentDidMount() {
		if (this.state.chat.length < 1) {
			this.start();
		  }
	}

	componentWillUnmount() {
		this.start();
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	navigation = direction => {
		console.log(direction);
		const token = localStorage.getItem('token')
		const headers = { headers: { Authorization: `Token ${token}` } }
		axios.post('https://lambdamud-backend-travis.herokuapp.com/api/adv/move/', direction, headers)
		  .then(res => {
			if (res.data.error_msg) {
			  alert(res.data.error_msg)
			}
			else {
			  const text = [
				{
				  title: res.data.title,
				  desc: res.data.description,
				  players: res.data.players,
				},
				...this.state.chat
			  ]
			  this.setState({
				...this.state,
				title: res.data.title,
				desc: res.data.description,
				players: res.data.players,
				error_msg: res.data.error_msg,
				chat: text
			  })
			}
		  })
		  .catch(err => console.log(err))
	};

	start = () => {
		const token = localStorage.getItem('token')
		const headers = { headers: { Authorization: `Token ${token}` } }
		axios.get('https://lambdamud-backend-travis.herokuapp.com/api/adv/init/', headers)
		  .then(res => {
			const pusherKey = '3a7f7142f527db47b7a1'
			const pusherCluster = 'us2'
			const pusher = new Pusher(pusherKey, {
			  cluster: pusherCluster
			})
			const channel = pusher.subscribe(`p-channel-${res.data.uuid}`);
			channel.bind('broadcast', data => {
			  const text = [
				{ "message": data.message },
				...this.state.chat
			  ]
			  this.setState({
				...this.state,
				chat: text
			  })
			})

			const chatLog = [{
			  title: res.data.title,
			  desc: res.data.description,
			  players: res.data.players,
			  uuid: res.data.uuid,
			}]
			this.setState({
			  title: res.data.title,
			  desc: res.data.description,
			  players: res.data.players,
			  uuid: res.data.uuid,
			  chat: chatLog
			})
		  })
		  .catch(err => console.log(err))
	  }

	  say = () => {
		const token = localStorage.getItem('token')
		const headers = { headers: { Authorization: `Token ${token}` } }
		const message = {
		  "message": "Hello, world!"
		}
		axios
		  .post('https://lambdamud-backend-travis.herokuapp.com/api/adv/say/', message, headers)
		  .then(res => res)
		  .catch(err => console.log(err.response));
	  };

	render() {
		return (
			<div>
				<div className='chat'><Chat chat={this.state.chat}/></div>
				<div className='movement'><Movement navigation={this.navigation} /></div>
				<button onClick={this.say()}>Send Message</button>
        		<button onClick={e => this.props.logout(e)}>Logout</button>
			</div>
		);
	}
}
