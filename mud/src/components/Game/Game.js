import React from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import Pusher from 'pusher-js';
import './Game.css';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			title: '',
			description: '',
			uuid: '',
			players: [],
			char: [],
			message: ''
		};
	}

	componentDidMount() {
		this.initializeGame();
		Pusher.logToConsole = true;
	}

	initializeGame = () => {
		const URL = 'http://lambda-mud-test.herokuapp.com/api/adv/init/';
		// need space in quotes on Token to receive data from server
		const token = ' Token ' + localStorage.getItem('authToken');
		const headers = {
			headers: { Authorization: token }
		};
		axios
			.get(URL, headers)
			.then((res) => {
				console.log('initData', res.data);
				const pusher = new Pusher('50780d4c7b46e5a4f915', {
					cluster: 'us3',
					forceTLS: true
				});
				this.channel = pusher.subscribe(`p-channel-${res.data.uuid}`);

				this.channel.bind('broadcast', (res) => {
					console.log('Broadcast: ' + JSON.stringify(res));
					let chat = this.state.chat.slice();
					chat.push(res);
					this.setState({ chat: chat });
				});
				this.setState({
					uuid: res.data.uuid,
					name: res.data.name,
					title: res.data.title,
					description: res.data.description,
					players: res.data.players
				});
			})
			.catch((err) => console.log(err));
	};

	playerMoveN = () => {
		const URL = 'https://lambda-mud-test.herokuapp.com/api/adv/move/';
		const token = ' Token ' + localStorage.getItem('authToken');
		const headers = {
			headers: { Authorization: token }
		};
		const body = { direction: 'n' };
		axios
			.post(URL, headers, body)
			.then((res) => {
				this.setState({
					name: res.data.name,
					title: res.data.title,
					description: res.data.description,
					players: res.data.players
				});
				console.log('moveData', res.data);
			})
			.catch((err) => console.log(err));
	};

	playerMoveS = () => {
		const URL = 'https://lambda-mud-test.herokuapp.com/api/adv/move/';
		const token = ' Token ' + localStorage.getItem('authToken');
		const headers = {
			headers: { Authorization: token }
		};
		const body = { direction: 's' };
		axios
			.post(URL, headers, body)
			.then((res) => {
				this.setState({
					name: res.data.name,
					title: res.data.title,
					description: res.data.description,
					players: res.data.players
				});
				console.log('moveData', res.data);
			})
			.catch((err) => console.log(err));
	};

	playerMoveE = () => {
		const URL = 'https://lambda-mud-test.herokuapp.com/api/adv/move/';
		const token = ' Token ' + localStorage.getItem('authToken');
		const headers = {
			headers: { Authorization: token }
		};
		const body = { direction: 'e' };
		axios
			.post(URL, headers, body)
			.then((res) => {
				this.setState({
					name: res.data.name,
					title: res.data.title,
					description: res.data.description,
					players: res.data.players
				});
				console.log('moveData', res.data);
			})
			.catch((err) => console.log(err));
	};

	playerMoveW = () => {
		// need URL
		const URL = 'https://lambda-mud-test.herokuapp.com/api/adv/move/';
		const token = ' Token ' + localStorage.getItem('authToken');
		const headers = {
			headers: { Authorization: token }
		};
		const body = { direction: 'w' };
		axios
			.post(URL, headers, body)
			.then((res) => {
				this.setState({
					name: res.data.name,
					title: res.data.title,
					description: res.data.description,
					players: res.data.players
				});
				console.log('moveData', res.data);
			})
			.catch((err) => console.log(err));
	};

	speak = (e) => {
		e.preventDefault();
		const URL = 'https://lambda-mud-test.herokuapp.com/api/adv/say/';
		const token = ' Token ' + localStorage.getItem('authToken');
		const headers = {
			headers: { Authorization: token }
		};
		const mes = {
			message: this.state.message
		};
		console.log(this.state.message);
		axios.post(URL, headers, mes).then((res) => {
			const chat = this.state.chat.slice();
			chat.push({
				username: res.data.username,
				massage: res.data.message
			});
			this.setState({
				chat: chat
			}).catch((err) => console.log(err));
		});
	};

	render() {
		let player;
		if (this.state.players.length === 0) {
			player = <div>No players in room</div>;
		} else {
			player = (
				<div>
					Players in room:{' '}
					{this.state.players.map((player) => {
						return <div>{player}</div>;
					})}
				</div>
			);
		}
		return (
			<div className="game">
				<Nav />
				<div className="name">Player: {this.state.name}</div>
				<div className="room">You are here: {this.state.title}</div>
				<div className="descpt">{this.state.description}</div>
				{player}
				<div className="compass">
					<h4>Where to?</h4>
					<button onClick={this.playerMoveN}>North</button>
					<div>
						<button onClick={this.playerMoveW}>West</button>
						<button onClick={this.playerMoveE}>East</button>
					</div>
					<button onClick={this.playerMoveS}>South</button>
				</div>
			</div>
		);
	}
}

export default Game;
