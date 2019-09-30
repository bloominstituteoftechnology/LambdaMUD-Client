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
			.post(URL, body, headers)
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
			.post(URL, body, headers)
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
			.post(URL, body, headers)
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
			.post(URL, body, headers)
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
