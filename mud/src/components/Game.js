import React from 'react';
import axios from 'axios';
import Nav from './Nav';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			title: '',
			description: '',
			uuid: '',
			players: [],
			error_msg: ''
		};
	}

	componentDidMount() {
		this.initializeGame();
	}

	initializeGame = () => {
		// need URL
		const URL = '';
		const token = 'Token' + localStorage.getItem('authToken');
		const headers = {
			headers: { 'content-type': 'application/JSON', Authorization: token }
		};
		axios
			.get(URL, headers)
			.then((res) => {
				this.setState({
					uuid: res.data.uuid,
					name: res.data.name,
					title: res.data.title,
					description: res.data.description,
					players: res.data.players
				});
				console.log('initData', res.data);
			})
			.catch((err) => console.log(err));
	};

	playerMoveN = () => {
		// need URL
		const URL = '';
		const token = 'Token' + localStorage.getItem('authToken');
		const headers = {
			headers: { 'content-type': 'application/JSON', Authorization: token }
		};
		const body = { direction: 'n' };
		axios
			.post(URL, body, headers)
			.then((res) => {
				this.setState({
					name: res.data.name,
					title: res.data.title,
					description: res.data.description,
					players: res.data.players,
					error_msg: res.data.error_msg
				});
				console.log('moveData', res.data);
			})
			.catch((err) => console.log(err));
	};

	playerMoveS = () => {
		// need URL
		const URL = '';
		const token = 'Token' + localStorage.getItem('authToken');
		const headers = {
			headers: { 'content-type': 'application/JSON', Authorization: token }
		};
		const body = { direction: 's' };
		axios
			.post(URL, body, headers)
			.then((res) => {
				this.setState({
					name: res.data.name,
					title: res.data.title,
					description: res.data.description,
					players: res.data.players,
					error_msg: res.data.error_msg
				});
				console.log('moveData', res.data);
			})
			.catch((err) => console.log(err));
	};

	playerMoveE = () => {
		// need URL
		const URL = '';
		const token = 'Token' + localStorage.getItem('authToken');
		const headers = {
			headers: { 'content-type': 'application/JSON', Authorization: token }
		};
		const body = { direction: 'e' };
		axios
			.post(URL, body, headers)
			.then((res) => {
				this.setState({
					name: res.data.name,
					title: res.data.title,
					description: res.data.description,
					players: res.data.players,
					error_msg: res.data.error_msg
				});
				console.log('moveData', res.data);
			})
			.catch((err) => console.log(err));
	};

	playerMoveW = () => {
		// need URL
		const URL = '';
		const token = 'Token' + localStorage.getItem('authToken');
		const headers = {
			headers: { 'content-type': 'application/JSON', Authorization: token }
		};
		const body = { direction: 'w' };
		axios
			.post(URL, body, headers)
			.then((res) => {
				this.setState({
					name: res.data.name,
					title: res.data.title,
					description: res.data.description,
					players: res.data.players,
					error_msg: res.data.error_msg
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
			player = <div>Players in room: {this.state.players}</div>;
		}
		return (
			<div>
				<Nav />
				<div className="name">Hello, {this.state.name}</div>
				<div className="room">You are here, {this.state.title}</div>
				<div className="descpt">{this.state.description}</div>
			</div>
		);
	}
}

export default Game;
