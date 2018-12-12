// Displays the Adventure and Directions components
// and handles most axios calls
import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import styled from 'styled-components';
import { Header, Directions, Adventure, Whisper, } from './components/index.js';

const StyledApp = styled.div`
	.content {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export default class App extends Component {
	state = {
		name: '',
		adventureEntries: [],
		error_msg: '',
		showWhisper: false,
	};

	token = localStorage.getItem(this.props.localStorageKey);
	headers = { headers: { Authorization: `Token ${ this.token }` } };

	// toggles the display of the whisper component
	toggleWhisper = () => this.setState({ showWhisper: !this.state.showWhisper });

	// takes in an object as 'data' variable that holds the whisper and target player,
	// sends it to backend server as data through an axios call
	// makes a post to broadcast 'whisper' to target player,
	// then adds 'whisper' to chat array of current adventure entry in state
	handleWhisper = data => {
		const { playerName } = data;
		return axios
			.post(`${ this.props.backendURL }/api/adv/whisper/`, data, this.headers)
			.then(res => {
				const whisper = res.data.whisper;
				const newAdventureEntries = [ ...this.state.adventureEntries ];
				const len = newAdventureEntries.length;
				newAdventureEntries[len - 1].chat.push(`You whispered to ${ playerName }: ${ whisper }`);
				return this.setState({
					...this.state,
					adventureEntries: newAdventureEntries,
				});
			})
			.catch(err => console.log(err.response));
	}; // handleWhisper()

	// takes in a string as 'shout' variable,
	// sends it to backend server as data through axios
	// makes a post to broadcast 'shout' to every other player,
	// then adds 'shout' to chat array of current adventure entry in state
	handleShout = shout => {
		const data = { shout };
		return axios
			.post(`${ this.props.backendURL }/api/adv/shout/`, data, this.headers)
			.then(res => {
				const shout = res.data.shout;
				const newAdventureEntries = [ ...this.state.adventureEntries ];
				const len = newAdventureEntries.length;
				newAdventureEntries[len - 1].chat.push(`You shouted ${ shout }`);
				return this.setState({
					...this.state,
					adventureEntries: newAdventureEntries,
				});
			})
			.catch(err => console.log(err.response));
	}; // handleShout()

	// takes in a string as 'say' variable,
	// sends it to backend server as data through axios
	// makes a post to broadcast 'say' to all other players in the current room,
	// adds 'say' to chat array of current adventure entry in state
	handleSay = say => {
		const data = { say };
		return axios
			.post(`${ this.props.backendURL }/api/adv/say/`, data, this.headers)
			.then(res => {
				const say = res.data.say;
				const newAdventureEntries = [ ...this.state.adventureEntries ];
				const len = newAdventureEntries.length;
				newAdventureEntries[len - 1].chat.push(`You said ${ say }`);
				return this.setState({
					...this.state,
					adventureEntries: newAdventureEntries,
				});
			})
			.catch(err => console.log(err.response));
	}; // handleSay()

	// takes in a string as 'direction'
	// sends it to backend server as data through axios
	// makes a post to broadcast your movement to all other players in the current room.
	// if an error(like you cant move in the chosen direction),
	// it logs the error messsage in the state, else it logs the current room's info
	// in new adventure entry in state
	handleMove = direction => {
		const data = { direction };
		return axios
			.post(`${ this.props.backendURL }/api/adv/move/`, data, this.headers)
			.then(res => {
				const title = res.data.title;
				const description = res.data.description;
				const players = res.data.players;
				const error_msg = res.data.error_msg;
				if (error_msg) {
					return this.setState({
						...this.state,
						error_msg,
					});
				}
				return this.setState({
					...this.state,
					adventureEntries: [
						...this.state.adventureEntries,
						{
							title,
							description,
							players,
							chat: [],
						},
					],
					error_msg,
				});
			})
			.catch(err => console.log(err.response));
	}; // handleMove()

	// When component mounts -> get request to retrieve all of player's current info,
	// registers the player to receive error events and broadcast events from their channel,
	// returns an updated state with a new adventure entry with
	// player's current info inside it
	componentDidMount() {
		return axios
			.get(`${ this.props.backendURL }/api/adv/init/`, this.headers)
			.then(res => {
				const uuid = res.data.uuid;
				const name = res.data.name;
				const title = res.data.title;
				const description = res.data.description;
				const players = res.data.players;
				const pusherKey = process.env.REACT_APP_PUSHER_KEY;
				const pusherCluster = process.env.REACT_APP_PUSHER_CLUSTER;
				const pusher = new Pusher(pusherKey, {
					cluster: pusherCluster,
					forceTLS: true,
				});
				const channel = pusher.subscribe(`p-channel-${ uuid }`);
				channel.bind('broadcast', data => {
					const newAdventureEntries = [ ...this.state.adventureEntries ];
					const len = newAdventureEntries.length;
					newAdventureEntries[len - 1].chat.push(data.message);
					this.setState({
						...this.state,
						adventureEntries: newAdventureEntries,
					});
				});
				pusher.connection.bind('error', err => console.log(err));
				return this.setState({
					...this.state,
					name,
					adventureEntries: [
						...this.state.adventureEntries,
						{
							title,
							description,
							players,
							chat: [],
						}
					],
				});
			})
			.catch(err => console.log(err.response));
	}; // componentDidMount()

	render() {
		const { handleLogout, backendURL } = this.props;
		const {
			name,
			adventureEntries,
			error_msg,
			showWhisper,
		} = this.state;
		return (
			<StyledApp>
				<Header />
				<div className='content'>
					<Adventure
						name={ name }
						adventureEntries={ adventureEntries }
						error_msg={ error_msg }
						handleSay={ this.handleSay }
						handleShout={ this.handleShout }
						toggleWhisper={ this.toggleWhisper }
						handleLogout={ handleLogout }
					/>
					<Directions handleMove={ this.handleMove } />
				</div>
				{
					showWhisper &&
					<Whisper
						handleWhisper={ this.handleWhisper }
						toggleWhisper={ this.toggleWhisper }
						headers={ this.headers }
						backendURL={ backendURL }
					/>
				}
			</StyledApp>
		);
	}
};