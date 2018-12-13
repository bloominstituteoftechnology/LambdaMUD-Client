import React from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import Chat from './Chat';
import Movement from './Movement';

export default class MainScreen extends React.Component {
	state = {
		title: '',
		description: '',
		players: [],
		chat: [],
		uuid: null,
		name: ''
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

	say = (input) => {
		const token = localStorage.getItem('token');
		const headers = { headers: { Authorization: `Token ${token}` } };
		const userMessageObject = {
			message: input
		};
		axios
			.post('https://lambdamud-backend-travis.herokuapp.com/api/adv/say/', userMessageObject, headers)
			.then((res) => {
				const text = [ { message: res.data.message }, ...this.state.chat ];

				this.setState({
					...this.state,
					title: res.data.title,
					desc: res.data.description,
					players: res.data.players,
					error_msg: res.data.error_msg,
					chat: text
				});
			})
			.catch((err) => console.log(err.response));
	};

	navigation = (direction) => {
		const token = localStorage.getItem('token');
		const headers = { headers: { Authorization: `Token ${token}` } };
		axios
			.post('https://lambdamud-backend-travis.herokuapp.com/api/adv/move/', direction, headers)
			.then((res) => {
				if (res.data.error_msg) {
					alert(res.data.error_msg);
				} else {
					const text = [
						{
							title: res.data.title,
							desc: res.data.description,
							players: res.data.players
						},
						...this.state.chat
					];
					this.setState({
						...this.state,
						title: res.data.title,
						desc: res.data.description,
						players: res.data.players,
						error_msg: res.data.error_msg,
						chat: text
					});
				}
			})
			.catch((err) => console.log(err));
	};

	start = () => {
		const token = localStorage.getItem('token');
		const headers = { headers: { Authorization: `Token ${token}` } };
		axios
			.get('https://lambdamud-backend-travis.herokuapp.com/api/adv/init/', headers)
			.then((res) => {
				this.setState({ name: res.data.name });
				Pusher.logToConsole = true;
				const pusherKey = '3a7f7142f527db47b7a1';
				const pusherCluster = 'us2';
				const pusher = new Pusher(pusherKey, {
					cluster: pusherCluster,
					forceTLS: true
				});
				// console.log(res.data.uuid);
				const channel = pusher.subscribe(`p-channel-${res.data.uuid}`);
				channel.bind('broadcast', (data) => {
					// alert(JSON.stringify(data.say));
					const text = [ { message: data.say }, ...this.state.chat ];
					this.setState({
						...this.state,
						chat: text
					});
				});

				const chatLog = [
					{
						title: res.data.title,
						desc: res.data.description,
						players: res.data.players,
						uuid: res.data.uuid
					}
				];
				this.setState({
					title: res.data.title,
					desc: res.data.description,
					players: res.data.players,
					uuid: res.data.uuid,
					chat: chatLog
				});
			})
			.catch((err) => console.log(err));
	};

	say = (input) => {
		const token = localStorage.getItem('token');
		const headers = { headers: { Authorization: `Token ${token}` } };
		const message = {
			message: input
		};
		// console.log(message.message)
		axios
			.post('https://lambdamud-backend-travis.herokuapp.com/api/adv/say/', message, headers)
			.then((res) => {
				const messageObject = [ { message: res.data.say }, ...this.state.chat ];
				this.setState({
					...this.state,
					chat: messageObject
				});
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<div>
				<h1 className="createHeader">Main Screen - Welcome, {this.state.name}</h1>
				<div className="chat">
					<Chat chat={this.state.chat} />
				</div>
				<div className="movement">
					<Movement say={this.say} navigation={this.navigation} />
				</div>
				{/* <button onClick={this.say()}>Send Message</button> */}
				<button onClick={(e) => this.props.logout(e)}>Logout</button>
			</div>
		);
	}
}
