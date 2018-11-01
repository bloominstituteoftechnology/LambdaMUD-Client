//This page will allow a person to register. Creating a username and password and conforming the password. 
import React, { Component } from "react";
import axios from 'axios'

const apiRegister = "https://lambdamud-backend.herokuapp.com/api/registration/"; // post
class RegisterPage extends Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };

  registerUser = credentials => {
    //The handleRegister function inside of the Register.js componenet is relied on for conditional checks before sending the request.
    //Once data gets here it should led to a successful status returned
    const promise = axios.post(apiRegister, credentials);
    promise
      .then(response => {
        console.log(response.status);
      })
      .catch(error => {
        console.log(error.response);
        console.log(error.response.data.error)
        alert(error.response.data.error)
        this.resetFields()
      });
  };
  handleChange = event => {
    //handles the input changes for username and both passwords  
    this.setState({ [event.target.name]: event.target.value });
  }; 

  resetFields = () => {
      //resets all fields to blank strings
      this.setState({username: "", password1: "", password2: ""})
  }

  handleRegister = () => {
      //will not actually register the user
      //this function sole purpose is to perform preliminary checks before sending a request to the api.
      //if a requirement is not met an alert is sent to the user and all fields are reset. 
      //once the requirements are met the registerUser function which is imported from the server folder is called 
      //that function will register the user. 
      const username = this.state.username.slice()
      const password1 = this.state.password1.slice()
      const password2 = this.state.password2.slice()
      if (username.length < 1){
          alert("Please enter a valid username.")
          this.resetFields()
      }
      if (password1.length < 6){
          alert("Please create a password. minumum 6 characters")
          this.resetFields()
      }
      if (password1 !== password2){
          alert("Password confirmation doesn't match.")
          this.resetFields()
      }
      if(username.length > 1 && password1.length > 5 && password1 === password2){
          this.registerUser({username, password1, password2})
      }
  }

  handleEnter = event => {
    event.preventDefault()
    this.handleRegister()

  }


  render() {
    return (
      <div>
        <div className="title-input mb-1">
          <span className="char1 title-first">U</span>
          <span className="char2 title-second">s</span>
          <span className="char3 title-third">e</span>
          <span className="char4 title-first">r</span>
          <span className="char5 title-second">N</span>
          <span className="char1 title-third">a</span>
          <span className="char2 title-first">m</span>
          <span className="char3 title-second">e</span>
        </div>
        <form onSubmit = {this.handleEnter}>
        
          <input
            onChange={this.handleChange}
            className="input-box"
            placeholder="Select Username"
            type="text"
            value={this.state.username}
            name="username"
          />
          <div className="title-input">
            <span className="char1 title-first">P</span>
            <span className="char2 title-second">a</span>
            <span className="char3 title-third">s</span>
            <span className="char4 title-first">s</span>
            <span className="char5 title-second">w</span>
            <span className="char1 title-third">o</span>
            <span className="char2 title-first">r</span>
            <span className="char3 title-second">d</span>
          </div>
          <input
            onChange={this.handleChange}
            className="input-box"
            type="password"
            placeholder="Choose Password"
            value={this.state.password1}
            name="password1"
          />
          <div className="title-input">
            <span className="char2 title-first">C</span>
            <span className="char3 title-second">o</span>
            <span className="char4 title-third">n</span>
            <span className="char5 title-first">f</span>
            <span className="char1 title-second">i</span>
            <span className="char2 title-third">r</span>
            <span className="char3 title-first">m</span>
            <span className="char1 title-second">P</span>
            <span className="char2 title-third">a</span>
            <span className="char3 title-first">s</span>
            <span className="char4 title-second">s</span>
            <span className="char5 title-third">w</span>
            <span className="char1 title-first">o</span>
            <span className="char2 title-second">r</span>
            <span className="char3 title-third">d</span>
          </div>
          <input
            onChange={this.handleChange}
            className = "input-box"
            type="password"
            placeholder="Retype Password"
            value={this.state.password2}
            name="password2"
          />
          <br/>
          {/* <button onClick = {this.handleRegister} className = "web-btn"> */}
          <button className="web-btn">
            <span className="char1 title-first">S</span>
            <span className="char2 title-second">u</span>
            <span className="char3 title-third">b</span>
            <span className="char4 title-first">m</span>
            <span className="char5 title-second">i</span>
            <span className="char1 title-third">t</span>
          </button>
        </form>
        <br />
      </div>
    );
  }
}

export default RegisterPage;
