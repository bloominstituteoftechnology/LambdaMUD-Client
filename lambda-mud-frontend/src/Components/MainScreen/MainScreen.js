import React, { Component } from 'react';
import axios from 'axios';
import "./MainScreenCss.css";
import {NavLink} from "react-router-dom";

class MainScreen extends Component {

    state ={
        userInput:"",
        name: "", 
        title: "",
        description: "", 
        players: []
    }

componentDidMount(){
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
<h3> Players in Room: {this.state.players}</h3>
<h1>{this.state.title}</h1>
<hr/>
<p>{this.state.description}</p>{}
</div>
<input className = "userInput" placeholder='userInput' name= 'userInput' onChange ={this.handleInputChange} value = {this.state.userInput}/>

<button className = "submit" onClick={this.move}>submit</button>

</div>

    )

}


}

export default MainScreen