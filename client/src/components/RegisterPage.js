import React, { Component } from "react";
import axios from 'axios'
 const url = "https://mudlambdahuthman.herokuapp.com/api/registration/"; // post
class RegisterPage extends Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };
   registerUser = credentials => {
    const promise = axios.post(url, credentials);
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
    this.setState({ [event.target.name]: event.target.value });
  }; 
   resetFields = () => {
      this.setState({username: "", password1: "", password2: ""})
  }
   handleRegister = () => {
      const username = this.state.username.slice()
      const password1 = this.state.password1.slice()
      const password2 = this.state.password2.slice()
      if (username.length <= 1){
          alert("Please enter a username.")
          this.resetFields()
      }
      if (password1.length <= 6){
          alert("Please create a password longer than 6 characters.")
          this.resetFields()
      }
      if (password1 !== password2){
          alert("Passwords do not match.")
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
        <div className="register-title">
          <p className="username-text">USERNAME</p>
        </div>
        <form onSubmit = {this.handleEnter}>
        
          <input
            onChange={this.handleChange}
            className="input-box"
            placeholder="Create Username"
            type="text"
            value={this.state.username}
            name="username"
          />
          <div className="register-title">
          <p className="password-text">PASSWORD</p>
          </div>
          <input
            onChange={this.handleChange}
            className="input-box"
            type="password"
            placeholder="Create Password"
            value={this.state.password1}
            name="password1"
          />
          <div className="register-title">
          <p className="confirm-text">Confirm Password</p>
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
          <button className="submit-btn">
          <p className="username-text">SUBMIT</p>
          </button>
        </form>
        <br />
      </div>
    );
  }
}
 export default RegisterPage;