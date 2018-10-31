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
    background-repeat: no-repeat;
  }
`;


class MainPage extends React.Component{
	constructor(props){
		super(props);
	
		this.pusher = new Pusher('d4bb0d94eb2ab6f12fcf', {
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
		
		axios.get('https://lambda-mud-project.herokuapp.com/api/adv/init',
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
        	
		axios.post("https://lambda-mud-project.herokuapp.com/api/adv/move/", payload,
            	{
                	headers: {
                    	"Authorization": `Token ${token}`,
                	}
            	})
		.then(res=>{
                        const room={title: res.data.title, description: res.data.description}
                        const players=res.data.players;
		        const message =res.data.error_msg;
			console.log(message);

                        this.setState({room:room, players:players, error:message, input:""});
		})
		.catch(error=>{
			console.log(error);
		
		});
    	}

	inputHandler=(event)=>{
                this.setState({[event.target.name]:event.target.value});
        }
	
	inputParser=(event)=>{
		event.preventDefault();	
		let input = this.state.input;
		const inputcmd=input.trim().split(" ");

		if (inputcmd[0].toLowerCase()==='move' && inputcmd.length===2){
			this.move(inputcmd[1]);	
		}
               
		else{
			this.setState({error:'Invalid command or missing command argument.', input:""});
		}
        
        }



	render(){
		return(
			<div>
			<GlobalStyle />
			
			<NavBar username={this.state.user.username} />
			
			<Container 
			message={this.state.error} 
			user={this.state.user} 
			room={this.state.room} 
			players={this.state.players}
			/>

			<InputCommands input={this.state.input} inputHandler={this.inputHandler}  inputParser={this.inputParser}/>
			</div>
			);

	}

}

export default MainPage;
