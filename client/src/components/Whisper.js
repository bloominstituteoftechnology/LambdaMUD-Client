// Displays whisper form
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledWhisper = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	height: 100vh;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	form {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		border: 1px solid black;
		border-radius: 5px;
		margin: 5px;
		width: 40%;
		background-color: white;
		h3 {
			padding: 10px;
			border-bottom: 1px solid black;
			background-color: purple;
			color: white;
		}
		input, select {
			border: 1px solid black;
			border-radius: 5px;
			padding: 10px 5px;
			margin: 20px 0 10px 10px;
			width: 60%;
		}
		.btn {
			margin: 0 0 10px 10px;
			border-radius: 5px;
			color: white;
			padding: 5px 10px;
			max-width: 30%;
			&:hover {
				cursor: pointer;
			}
		}
		.whisper-btn {
			border: 1px solid #886176;
			background-color: #886176;
			&:hover {
				border: 1px solid #6A4C5C;
				background-color: #6A4C5C;
			}
		}
		.cancel-btn {
			border: 1px solid #DA4167;
			background-color: #DA4167;
			&:hover {
				border: 1px solid #982D48;
				background-color: #982D48;
			}
		}
		p {
			padding: 10px;
		}
	}
`;

export default class Whisper extends Component {
	state = {
		players: [],
		errorMsg: '',
	};

	// Creates a whisper object named 'data' and sends it to handleWhisper()
	handleSubmit = e => {
		e.preventDefault();
		const option = e.target[1].value;
		if (option === '0') return this.setState({ errorMsg: 'Please select a player.' });
		const whisper = e.target[0].value;
		const playerName = this.state.players[parseInt(option) - 1][0];
		const playerUUID = this.state.players[parseInt(option) - 1][1];
		const data = { whisper, playerName, playerUUID };
		this.props.handleWhisper(data);
		this.props.toggleWhisper();
		return this.setState({ players: [], errorMsg: '' });
	};

	// When component first mounts, retrieve a list of all the players
	componentDidMount() {
		return axios
			.get(`${ this.props.backendURL }/api/adv/players/`, this.props.headers)
			.then(res => {
				const players = res.data.players;
				return this.setState({ players });
			})
			.catch(err => console.log(err.response));
	}; //componentDidMount()

	render() {
		const { toggleWhisper } = this.props;
		const { players, errorMsg } = this.state;
		return(
			<StyledWhisper>
				<form onSubmit={ this.handleSubmit }>
					<h3>Whisper</h3>
					<input type='text' placeholder='Whisper...'/>
					<select>
						<option value='0'>Select player:</option>
						{
							players.map((player, i) =>
								<option
									key={ i }
									value={ i + 1 }
								>{ player[0] }</option>
							)
						}
					</select>
					<button className='btn whisper-btn' type='submit'>Whisper</button>
					<button
						className='btn cancel-btn' onClick={ toggleWhisper }>Cancel</button>
					{
						errorMsg && <p>{ errorMsg }</p>
					}
				</form>
			</StyledWhisper>
		);
	}
};