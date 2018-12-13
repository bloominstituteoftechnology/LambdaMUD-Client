import React, { Component } from 'react';
import axios from 'axios'
import "./componentCss.css"
import {NavLink} from "react-router-dom"

class Registration extends Component {
constructor(){
  super();
  this.handleInputChange = this.handleInputChange.bind(this);
  this.state={

    username: '',
    email:'',
    password:'',
  
  }
}

 register(){
  
  const crds = {
    username: this.state.username,
    email: this.state.email,
    password:this.state.password,
    
  }
  const URL = 'https://lambda-mud-backend.herokuapp.com/api/login/';
  axios
  .post(`${URL}`,crds)
  .then(response=>{
    console.log(response.data.key)
    window.localStorage.setItem('authKey',response.data.key)
  })
  .catch(err=>{
     console.log(err.response)
  })
}
// use this to get key out of storage window.localStorage.getItem(authkey)

handleInputChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};
  render() {
    return (
      <div className="Login">
     <h1> Login to Game </h1>
       
      <input className = "username" placeholder='username' name= 'username' onChange ={this.handleInputChange} value = {this.state.username}/>
      <input className = "email" placeholder='email' name= 'email' onChange ={this.handleInputChange} value = {this.state.email}/>
      <input className = "password" placeholder='password' name= 'password' onChange ={this.handleInputChange} value = {this.state.password1}/>
      
      <button className = 'submit' onClick={()=>{this.register()}}>Submit</button>
     
      <h4> Have an account?</h4>
     <NavLink to='/login'>Login </NavLink>
      </div>


    );
  }
}

export default Registration;
