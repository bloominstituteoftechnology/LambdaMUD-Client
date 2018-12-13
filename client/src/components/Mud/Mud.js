import React from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import Pusher from 'pusher-js';
import {API_ID, CLUSTER} from './keys'
import { ContainMud, FlexForm, BTNLog, Chatbox, PanelDiv, InstrcDiv, SubH2, DungeonDiv, BTNWrapper, SubH2Chat, Yell } from '../../css';

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
			say: [],
			error_msg: '',
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
	  	this.setUpPusher()
	  })
	  .catch(error => {
	  	console.log(error.response)
	  })
	}

	componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
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

 	setUpPusher = () => {
 		Pusher.logToConsole = true;
    let pusher = new Pusher(API_ID, {
      cluster: CLUSTER,
      forceTLS: true
    });
  	const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
  	channel.bind('broadcast', data => {
			if (data.message){
				this.setState({data: data.message})
			}
			if (data.say || data.yell || data.whisper){

				if (data.say){
					this.setState({say: [...this.state.say, data.say]})
				}  

				if (data.yell) {
					this.setState({say: [...this.state.say, data.yell]})
				}

				if (data.whisper){
					this.setState({say: [...this.state.say, data.whisper]})
				}
			}
		});
 	}

 	getCommand = event => {
 		event.preventDefault();
		let tokenStr = localStorage.getItem('token')

		let checkArr = this.state.enterCommand.split(" ")

		if (checkArr[0] === 'say'){
			checkArr.shift()
			checkArr = checkArr.join(' ')
			this.setState({
				enterCommand: ''
			})

			let msg = {'message': checkArr}
			axios.post('https://lambda-dungeon.herokuapp.com/api/adv/say/', msg,
		    {headers: {
			      "Authorization" : "Token " + tokenStr
			    }
			  }
			)
			.then(response => {
				console.log(response.data)
				// console.log(this.state.say)
			})
			.catch(error => {
				console.log(error.response.data)
			})
			return
		}

		if (checkArr[0] === 'yell'){
			checkArr.shift()
			checkArr = checkArr.join(' ')
			this.setState({
				enterCommand: ''
			})

			let msg = {'message': checkArr}
			axios.post('https://lambda-dungeon.herokuapp.com/api/adv/yell/', msg,
		    {headers: {
			      "Authorization" : "Token " + tokenStr
			    }
			  }
			)
			.then(response => {
				console.log(response.data)
			})
			.catch(error => {
				console.log(error.response.data)
			})
			return
		}

		if (checkArr[0] === 'whisper'){
			checkArr = checkArr.join(' ')
			this.setState({
				enterCommand: ''
			})

			let msg = {'message': checkArr}
			axios.post('https://lambda-dungeon.herokuapp.com/api/adv/whisper/', msg,
		    {headers: {
			      "Authorization" : "Token " + tokenStr
			    }
			  }
			)
			.then(response => {
				console.log(response.data)
				if (response.data.error_w){
					this.setState({say: [...this.state.say, response.data.error_w]})
				}
			})
			.catch(error => {
				console.log(error.response)
			})
			return
		}

		if (checkArr[0] === 'look'){
			checkArr = checkArr.join(' ')
			this.setState({
				enterCommand: ''
			})

			let msg = {'message': checkArr}
			axios.post('https://lambda-dungeon.herokuapp.com/api/adv/look/', msg,
		    {headers: {
			      "Authorization" : "Token " + tokenStr
			    }
			  }
			)
			.then(response => {
				console.log(response.data)
				if (response.data.items){
					this.setState({say: [...this.state.say, `you see: ${response.data.items}`]})
				} else {
					this.setState({say: [...this.state.say, 'you see nothing of importance']})
				}
			})
			.catch(error => {
				console.log(error.response)
			})
			return
		}

		if (checkArr[0] === 'pickup' || checkArr[0] === 'drop' || checkArr[0] === 'inv'){
			let rsp = checkArr.join(' ')
			this.setState({
				enterCommand: ''
			})

			let msg = {'message': rsp}
			axios.post(`https://lambda-dungeon.herokuapp.com/api/adv/${checkArr[0]}/`, msg,
		    {headers: {
			      "Authorization" : "Token " + tokenStr
			    }
			  }
			)
			.then(response => {
				console.log(response.data)
				this.setState({say: [...this.state.say, response.data.items]})
			})
			.catch(error => {
				console.log(error.response)
			})
			return
		}

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
	  		uuid: this.state.uuid,
	  		data: '',
	  		say: [],
	  		error_msg: response.data.error_msg,
	  	})
	  })
	  .catch(error => {
	  	console.log(error.response.data)
	  })
 	}
	render() {
		const token = Object.keys(localStorage)
    if (token.includes('token') === false) {
     return (
      <div>
        <Redirect to='/'/>
      </div>
      )
    } else {
			return (
				<div>
					<script src="https://js.pusher.com/4.3/pusher.min.js"></script>
					<ContainMud>
						<DungeonDiv>
							<h2>{this.state.title}</h2>
							<div>
								<p>{this.state.description}</p>
								<p>{this.getPlayers()}</p>
								<p>{this.state.data}</p>
								<p>{this.state.error_msg}</p>
							</div>
						</DungeonDiv>
						<SubH2Chat><p>UpdateBox</p></SubH2Chat>
						<Chatbox>
							{this.state.say.map(msg  => (
								<p>{msg}</p>
							))}
							<div ref={el => { this.el = el; }} />
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
						<PanelDiv>
							<SubH2>Instructions</SubH2>
							<InstrcDiv>
								<p>Moment keys: n, s, e, w</p><br />
								<p>Commands: say, yell, whisper playername, inv, look, pickup, drop</p>
							</InstrcDiv>
						</PanelDiv>
					</ContainMud>
					<BTNWrapper>
						<BTNLog onClick={() => {localStorage.clear(); window.location.reload();}}><p>Log Out</p></BTNLog>
					</BTNWrapper>	
				</div>
			)
		}
	}
}

export default Mud;