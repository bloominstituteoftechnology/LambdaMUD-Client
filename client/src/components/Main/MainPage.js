import React,{Fragment} from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import Pusher from 'pusher-js';
import img5 from '../../images/img5.jpg';
import NavBar from '../NavBar/NavBar';
import Container from '../GameContainer/Container';
import InputCommands from '../GameContainer/InputCommands';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;	  
    background-image: url(${img5});
    background-size: cover;
    background-repeat: repeat;
  }
`;


class MainPage extends React.Component{
	constructor(props){
		super(props);
	
		this.pusher = new Pusher('3269dc0d034164676ca2', {
			 cluster: 'us2'
		});

		this.state = {
			user:{
				username:"",
				uuid:"",
			},
			room:{
				title:"",
				description:"",
			},
			players:[],
			status:200,
			error:"",
			input:"",
			message:[],
			dir:"",
		}
	}


	componentDidMount() {
		const token=localStorage.getItem('mud-token');

		if(!token) {
			this.props.history.replace('/login');
		}

		this.gameStart(token);
	}



	gameStart=(token) => {
		
		axios.get('https://multi-user-game.herokuapp.com/api/adv/init',
		{
			headers:{
				"Authorization": `Token ${token}`,	
			}
		})
		.then(res=>{
			const user={username: res.data.name, uuid: res.data.uuid}
			const room={title: res.data.title, description: res.data.description}
			const players=res.data.players;
			this.setState({user:user, room:room, players:players});

			const sub = 'p-channel-' + res.data.uuid;

			var channel = this.pusher.subscribe(sub);
			
			channel.bind('broadcast', data => {
				const message=this.state.message.slice();
				message.push(data.message);

				this.setState({message:message});
			});



		})

		.catch(error=>{
			console.log('Could get any data back');	
		
		});
	
	}


    	move = (direction) => {
        	const token = localStorage.getItem('mud-token');
        	
		const payload = {
            		direction: direction
        	}
        	
		axios.post("https://multi-user-game.herokuapp.com/api/adv/move/", payload,
            	{
                	headers: {
                    	"Authorization": `Token ${token}`,
                	}
            	})
		.then(res=>{
                        const room={title: res.data.title, description: res.data.description}
                        const players=res.data.players;
		        const error =res.data.error_msg;
			console.log(error);

                        this.setState({room:room, players:players, error:error, input:""});
		})
		.catch(error=>{
			console.log(error);
		
		});
    	}



	inputHandler=(event)=>{
                this.setState({[event.target.name]:event.target.value});
        }



	sayHandler = (message) => {
                const token = localStorage.getItem('mud-token');
		
                const payload = {
                        message: message
                }
		
                axios.post("https://multi-user-game.herokuapp.com/api/adv/say/", payload,
                {
                        headers: {
                        "Authorization": `Token ${token}`,
                        }
                })
                .then(res=>{

			const message=this.state.message.slice();

			const msg=res.data.message;
			const msgArray=msg.split(" ");
			
			msgArray.shift();
			const msgNew = msgArray.join(' ');

			const entire_msg = "You said: "+msgNew;
                        message.push(entire_msg);


                        this.setState({message:message, input:""});
                })
                .catch(error=>{
                        console.log(error);

                });
        }


	 whisperHandler = (message, username) => {
                const token = localStorage.getItem('mud-token');

                const payload = {
                        message: message,
			username: username
                }

                axios.post("https://multi-user-game.herokuapp.com/api/adv/whisper/", payload,
                {
                        headers: {
                        "Authorization": `Token ${token}`,
                        }
                })
                .then(res=>{

                        const message=this.state.message.slice();

                        const msg=res.data.message;
                        const msgArray=msg.split(" ");

                        msgArray.shift();
                        const msgNew = msgArray.join(' ');

                        const entire_msg = "You whispered: "+msgNew;
                        message.push(entire_msg);


                        this.setState({message:message, input:""});
                })
                .catch(error=>{
                        console.log(error);

                });
        }

	shoutHandler = (message) => {
                const token = localStorage.getItem('mud-token');

                const payload = {
                        message: message,
                }

                axios.post("https://multi-user-game.herokuapp.com/api/adv/shout/", payload,
                {
                        headers: {
                        "Authorization": `Token ${token}`,
                        }
                })
                .then(res=>{

                        const message=this.state.message.slice();

                        const msg=res.data.message;
                        const msgArray=msg.split(" ");

                        msgArray.shift();
                        const msgNew = msgArray.join(' ');

                        const entire_msg = "You said: "+msgNew;
                        message.push(entire_msg);


                        this.setState({message:message, input:""});
                })
                .catch(error=>{
                        console.log(error);

                });
        }


	inputParser=(event)=>{
		event.preventDefault();	
		let input = this.state.input;
		const inputcmd=input.trim().split(" ");

		if (inputcmd[0].toLowerCase()==='move' && inputcmd.length==2){
			this.move(inputcmd[1]);	
		}

		else if (inputcmd[0].toLowerCase()==='say' && inputcmd.length >= 2){
			inputcmd.shift();
			const message = inputcmd.join(' ');
			this.sayHandler(message);
                }

		else if (inputcmd[0].toLowerCase()==='whisper' && inputcmd.length >= 3){
			const username=inputcmd[1];
			this.setState({dir: username});
                        inputcmd.shift();
			inputcmd.shift();
                        const message = inputcmd.join(' ');
                        this.whisperHandler(message, username);
                }

		else if (inputcmd[0].toLowerCase()==='shout' && inputcmd.length >= 2){
                        inputcmd.shift();
                        const message = inputcmd.join(' ');
                        this.shoutHandler(message);
                }
               
		else{
			this.setState({error:`${input} is an invalid command or you are missing command arguments.`, input:""});
		}
        
        }


	render(){
		return(
			<div>
			<GlobalStyle />
			
			<NavBar username={this.state.user.username} />
			
			<Container 
			error={this.state.error} 
			user={this.state.user} 
			room={this.state.room} 
			players={this.state.players}
			broadcast={this.state.message}
			input={this.state.input}
			inputHandler={this.inputHandler}
			inputParser={this.inputParser}
			/>
			
			</div>
			);

	}
}

export default MainPage;
