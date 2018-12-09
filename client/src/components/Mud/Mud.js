import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Contain, MainH1, FlexForm, BTN, BTNDiv, Chatbox, PanelDiv, InstrcDiv } from '../../css';
// import axios from 'axios';

class Mud extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			enterCommand: '',
			playerName: '',
			title: '',
			description: '',
			uuid: '',
			players: []
		};
	}

	componentDidMount(){
		let tokenStr = localStorage.getItem('token')
		console.log(tokenStr)

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
 		let playersDiv
		let players_room = ''
		let people = this.state.players

		if (people.length === 1) {
			players_room = `${people[0]} is near by.`
			return players_room
		} else if (people.length == 2){
			players_room = `${people[0]} and ${people[1]} are near by.`
			return players_room
		} else if (people.length > 2) {
			for (let i = 0; i < people.length; i++){
				if (i === people.length - 1){
					players_room += 'and ' + people[i] + ' are near by'
					return players_room
				}
				players_room += people[i] + ', '
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
	  	console.log(response.data)
	  	this.setState({
	  		playerName: response.data.name,
	  		title: response.data.title,
	  		description: response.data.description,
	  		uuid: response.data.uuid,
	  		players: response.data.players,
	  		enterCommand: '',
	  	})
	  })
	  .catch(error => {
	  	console.log(error.response)
	  })
 	}

	render() {
		const token = Object.values(localStorage)

    if (token.length === 0) {
     return (
      <div>
        <Redirect to='/signin'/>
      </div>
      )
    } else {

			return (
				<div>
					<Contain>
						<MainH1>Hello MUD!!!!</MainH1>
						<Chatbox>
							<div>
								<p>Player - {this.state.playerName}</p>
								<p>{this.state.title}</p>
								<p>{this.state.description}</p>
								<p>{this.getPlayers()}</p>
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
