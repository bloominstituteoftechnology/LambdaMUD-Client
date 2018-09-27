import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import "./game.css";

class Game extends Component {
	constructor(props) {
		super();
		this.state = {
			description: "",
			name: "",
			uuid: null,
			title: "",
			players: [],
			command: "",
			error_msg: null,
			message: null
		};
	}
	componentDidMount() {
		// const url = "http://localhost:8800";
		const url = "https://sibhat-lambdamud.herokuapp.com";
		axios
			.get(`${url}/api/adv/init/`, {
				headers: {
					Authorization: `Token ${localStorage.getItem("key")}`
				}
			})
			.then(response => {
				console.log(response.data);
				let state = response.data;
				this.setState({ ...state });
				const pusher = new Pusher("c515477a7100fd072337", {
					cluster: "us2",
					encrypted: true
				});
				const channel = pusher.subscribe(
					`p-channel-${response.data.uuid}`
				);
				channel.bind("broadcast", data => {
					this.setState({ ...data });
				});
			})
			.catch(error => {
				console.log({ error });
			});
	}
	handleInput = e => {
		let comand = e.target.value;
		let data;
		if (Number(e.charCode) === 13) {
			// let url = "http://localhost:8800";
			let url = "https://sibhat-lambdamud.herokuapp.com";
			if (comand.length === 1) {
				url += "/api/adv/move/";
				data = { direction: comand };
			} else if (comand.split(" ")[0].toLowerCase() === "say") {
				url += "/api/adv/say/";
				comand = comand.split(" ")[1];
				data = { message: comand };
			}
			axios
				.post(`${url}`, data, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("key")}`
					}
				})
				.then(response => {
					// console.log(response.data);
					let state = response.data;
					this.setState({ ...state });
				})
				.catch(error => {
					console.log({ error });
				});
			e.target.value = "";
		}
	};
	render() {
		let {
			name,
			uuid,
			message,
			description,
			title,
			players,
			error_msg
		} = this.state;
		return (
			<div className="game">
				<div className="game__center">
					<div className="game_header">
						<strong>{name}</strong> : id [ {uuid} ]
					</div>
					<div className="game__body">
						Your location: {title}
						<br />
						{description}
						<br />
						<br />
						{message ? <span>New message: {message}</span> : null}
						<br />
						<br />
						players in room: {players}
						<br />
						<br />
						<span>{error_msg}</span>
					</div>
					<div className="game__command">
						<i className="fas fa-angle-double-right" />
						<input
							type="text"
							name="comand"
							className="game__input"
							onKeyPress={this.handleInput}
							placeholder="Enter command"
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default Game;
