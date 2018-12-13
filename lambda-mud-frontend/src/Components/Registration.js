import React, { Component } from 'react';



class Registration extends Component {
constructor(){
  super();
  this.state={

    username='',
    email='',
    password1='',
    password2= '',
  }
}

componentWillUnmount(){
  const crds = {
    username=this.state.username,
    email=this.state.email,
    password1=this.state.password1,
    password2= this.password2,
  }
  const URL = 'https://lambda-mud-backend.herokuapp.com/api/registration/';
  axios
  .post(`${URL}`,crds)
  .then(response=>{
    console.log(response)
    window.localStorage.setItem(authKey,response.data)
  })
  .catch(err=>{
     console.log(err)
  })
}

// use this to get key out of storage window.localStorage.getItem(authkey)


  render() {
    return (
      <div className="Registration">
     
       
      <input className = "username" placeholder='username' name= 'username' onChange ={this.handleInputChange} value = {this.state.username}/>
      <input className = "email" placeholder='email' name= 'email' onChange ={this.handleInputChange} value = {this.state.email}/>
      <input className = "password1" placeholder='password1' name= 'password1' onChange ={this.handleInputChange} value = {this.state.password1}/>
      <input className = "password2" placeholder='password2' name= 'password2' onChange ={this.handleInputChange} value = {this.state.password2}/>

      
      </div>


    );
  }
}

export default Registration;
