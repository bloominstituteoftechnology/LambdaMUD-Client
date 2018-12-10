import React from 'react';
import axios from 'axios';

export default class MainScreen extends React.Component {
	state = {
		roomName: '',
		roomDesc: '',
		playerName: '',
		chat: [],
		message: '',
		currentRoom: '',
		uuid: '',
		players: []
	};

	componentDidMount() {}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	navigation = (direction) => {
		console.log(direction);
	};

	render() {
		return (
			<div>
				<div className="chat">{this.state.chat}</div>
				<input
					className="messageInput"
					name="message"
					placeholder="Type Here"
					value={this.state.message}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}
