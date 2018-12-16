import React, { Component } from 'react';
import axios from 'axios';
import "./MainScreenCss.css";
import Pusher from 'pusher-js';
import Players from "./Players"


 

class MainScreen extends Component {

    state ={
        userInput:"",
        name: "", 
        title: "",
        description: "", 
        players: [],
        message:"",
        chatMessage:"",
        chats:[]
        
    }

componentDidMount(){

    this.pusher = new Pusher('d6c84f9ec64fbcd9df76', {
        cluster: 'us2',
        forceTLS: true,
        authEndpoint: '/pusher/auth',
      });
    //access channel for player room
   this.channel = this.pusher.subscribe('p-channel-ec5ea3bc-3002-4c6a-9ab7-3e763855a94e');
   this.channel.bind('broadcast', data => {

        this.setState({ chats: [...this.state.chats, data.message]});
      },this);

   const api = 'https://lambda-mud-backend.herokuapp.com/api/adv/init/';
   const token = window.sessionStorage.getItem('authKey');
     console.log(token)
    axios.get(api, { headers: {Authorization: `Token ${token}`} })
    .then(response => {
        console.log(response.data);
        
    this.setState({
        name:response.data.name,
        title:response.data.title,
        description:response.data.description,
        players:response.data.players
    }, )
           })
    .catch(err=>{
        console.log(err)
    })

    }

    sendMes = (event) => {
        event.preventDefault()
       

       const message = {message:this.state.message};
       const URL = 'https://lambda-mud-backend.herokuapp.com/api/adv/say/';
       const token = window.sessionStorage.getItem('authKey');
        axios
        .post(URL, message , { headers: {Authorization: `Token ${token}`}})
        .then(response => {
            console.log(response.data.message)
            this.setState({
            chatMessage: response.data.message,
            });

        },this.props.history.push(`/MainScreen`))
        .catch(err=>{
            console.log(err)
        })
    }




    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    move = () => {
        
        const moves = {direction: this.state.userInput}
        const URL = 'https://lambda-mud-backend.herokuapp.com/api/adv/move';
        const token = window.sessionStorage.getItem('authKey');
        axios
        .post(`${URL}`, moves, { headers: {Authorization: `Token ${token}`}})
        .then(response=>{
          console.log(response.data)
          this.setState({
            name:response.data.name,
            title:response.data.title,
            description:response.data.description,
            players:response.data.players,
        }, )
       
        },this.props.history.push(`/MainScreen`))
        .catch(err=>{
           console.log(err.response)
        })
      }
    


render(){
   
    return(
<div className= 'mainScreen'>
<div className = 'gameinfo'>
<h3>Username: {this.state.name}</h3>
<div> Players in Room: {this.state.players.map(player => (
          <Players key={player.id} player={player} />
        ))}
</div>
<h1>{this.state.title}</h1>
<hr/>
<p>{this.state.description}</p>{}
</div>
<input className = "userInput" placeholder='userInput' name= 'userInput' onChange ={this.handleInputChange} value = {this.state.userInput}/>
<p>Enter direction:</p>
<button className = "submit" onClick={this.move}>submit</button>
<hr/>
<h3>Room chatboard:</h3>
<div>message:{this.state.chats.map(player => (
          <Players key={player.id} player={player} />
        ))}</div>

<input className = "message" placeholder='message' name= 'message' onChange ={this.handleInputChange} value = {this.state.message}/>
<button onClick={this.sendMes}>Send</button>
</div>

    )

}


}

export default MainScreen


