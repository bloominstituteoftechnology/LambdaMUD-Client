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
   const api = 'http://lambda-mud-backend.herokuapp.com/api/adv/init/';
   const token = window.localStorage.getItem('authkey');
     console.log(token)
    axios.get(api, { withCredentials: true, headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => {
        console.log(res.data);
    this.setState({
        
    }, )
           })
    .catch(err=>{
        console.log(err)
    })

    }

    


render(){
    return(
<div className= 'mainScreen'>
<div className = 'gameinfo'>
<h3>username:{this.name}</h3>
<h3> Players in Room: {this.players}</h3>
<h1>{this.title}</h1>
<hr/>
<p>{this.description}</p>{}
</div>
<input className = "userInput" placeholder='userInput' name= 'userInput' onChange ={this.handleInputChange} value = {this.state.userInput}/>
</div>

    )

}


}

export default MainScreen