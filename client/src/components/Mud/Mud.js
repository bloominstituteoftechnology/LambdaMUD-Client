import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import Pusher from 'pusher-js';
import {API_ID, CLUSTER} from './keys'
import { Contain, MainH1, FlexForm, BTN, Chatbox, PanelDiv, InstrcDiv } from '../../css';

class Mud extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			enterCommand: '',
			playerName: '',
			title: '',
			description: '',
			uuid: '',
			players: [],
			data: '',
		};
	}

	componentDidMount(){
		let tokenStr = localStorage.getItem('token')

		axios.get(
	    'https://lambda-dungeon.herokuapp.com/api/adv/init/',
	    {headers: {
	        "Authorization" : "Token " + tokenStr
	      }
	    }
	  )
	  .then(response => {
	  	console.log(response.data)
	  	this.setState({
	  		playerName: response.data.name,
	  		title: response.data.title,
	  		description: response.data.description,
	  		uuid: response.data.uuid,
	  		players: response.data.players
	  	})
	  })
	  .catch(error => {
	  	console.log(error.response)
	  })
	}

	handleChange = event => {
 	   this.setState({[event.target.name]: event.target.value})
 	}

 	getPlayers = () => {
		let players_room = ''
		let people = this.state.players
		let msg = this.state.data
		let filterd = []

		for (let x in people){
			if (msg.includes(people[x])){
				continue
			} else {
				filterd.push(people[x])
			}
		}

		if (filterd.length === 1) {
			players_room = `${filterd[0]} is near by.`
			return players_room
		} else if (filterd.length === 2){
			players_room = `${filterd[0]} and ${filterd[1]} are near by.`
			return players_room
		} else if (filterd.length > 2) {
			for (let i = 0; i < filterd.length; i++){
				if (i === filterd.length - 1){
					players_room += 'and ' + filterd[i] + ' are near by'
					return players_room
				}
				players_room += filterd[i] + ', '
			}
		}
 	}

 	getCommand = event => {
 		event.preventDefault();

 		let tokenStr = localStorage.getItem('token')

 		let d = {direction: this.state.enterCommand}

		axios.post(
	    'https://lambda-dungeon.herokuapp.com/api/adv/move/', d,

	    {headers: {
	        "Authorization" : "Token " + tokenStr
	      }
	    }

	  )
	  .then(response => {
	  	// console.log(response.data)
	  	this.setState({
	  		playerName: response.data.name,
	  		title: response.data.title,
	  		description: response.data.description,
	  		uuid: response.data.uuid,
	  		players: response.data.players,
	  		enterCommand: '',
	  		uuid: this.state.uuid,
	  		data: '',
	  	})
	  })
	  .catch(error => {
	  	console.log(error.response)
	  })
 	}

	render() {
		const token = Object.keys(localStorage)
		console.log(token)

    if (token.includes('token') === false) {
     return (
      <div>
        <Redirect to='/'/>
      </div>
      )
    } else {

	    Pusher.logToConsole = true;

	    let pusher = new Pusher(API_ID, {
	      cluster: CLUSTER,
	      forceTLS: true
	    });

			if (this.state.uuid){
	    	const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
				channel.bind('broadcast', data => {
					this.setState({data: data.message})
				});
	    }

			return (
				<div>
					<script src="https://js.pusher.com/4.3/pusher.min.js"></script>
					<Contain>
						<MainH1>Hello MUD!!!!</MainH1>
						<Chatbox>
							<div>
								<p>Player - {this.state.playerName}</p>
								<p>{this.state.title}</p>
								<p>{this.state.description}</p>
								<p>{this.getPlayers()}</p>
								<p>{this.state.data}</p>
								
							</div>
						</Chatbox>

						<FlexForm onSubmit={this.getCommand}>
							<input
								type="text"
								placeholder='enter command'
								onChange={this.handleChange}
								name="enterCommand"
								value={this.state.enterCommand}
							/>
						</FlexForm>
					</Contain>
					<PanelDiv>
							<InstrcDiv>
								<p>Moment keys: n,s,e,w</p>
							</InstrcDiv>
							<BTN onClick={() => {localStorage.clear(); window.location.reload();}}><p>Log Out</p></BTN>
					</PanelDiv>
				</div>
			)
		}
	}
}

export default Mud;
