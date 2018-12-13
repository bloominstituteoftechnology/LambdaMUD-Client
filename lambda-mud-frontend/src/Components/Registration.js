import React, { Component } from 'react';
import axios from 'axios'
import "./componentCss.css"

class Registration extends Component {
constructor(){
  super();
  this.handleInputChange = this.handleInputChange.bind(this);
  this.state={

    username: '',
    email:'',
    password1:'',
    password2: '',
  }
}

 register(){
  
  const crds = {
    username: this.state.username,
    email: this.state.email,
    password1:this.state.password1,
    password2: this.state.password2,
  }
  const URL = 'https://lambda-mud-backend.herokuapp.com/api/registration/';
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
      <div className="Registration">
     <h1> Register for Login to Game </h1>
       
      <input className = "username" placeholder='username' name= 'username' onChange ={this.handleInputChange} value = {this.state.username}/>
      <input className = "email" placeholder='email' name= 'email' onChange ={this.handleInputChange} value = {this.state.email}/>
      <input className = "password1" placeholder='password1' name= 'password1' onChange ={this.handleInputChange} value = {this.state.password1}/>
      <input className = "password2" placeholder='password2' name= 'password2' onChange ={this.handleInputChange} value = {this.state.password2}/>
      <button className = 'submit' onClick={()=>{this.register()}}>Submit</button>
      
      </div>


    );
  }
}

export default Registration;
