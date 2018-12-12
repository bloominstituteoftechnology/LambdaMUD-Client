import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Redirect} from "react-router";
import axios from "axios"; 
const url= "https://mudlambdahuthman.herokuapp.com/api/login"; 
 class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    token : "",
  };
   resetInput = () => {    
      this.setState({username: "", password: ""})
  }
   handleChange = event => { 
    this.setState({ [event.target.name]: event.target.value });
  };
   userLogin = credentials => {
     
    const promise = axios.post(url, credentials);
    promise
      .then(response => {
        console.log(response.data);
        localStorage.setItem('jwt', response.data.key);
        this.setState({token: response.data})
      })
  
      .catch(error => {
        console.log(error);
      });
  };
   handleLogin = () => {
    const username = this.state.username.slice()
    const password = this.state.password.slice()
     if (username.length <= 1){
        alert("Invalid Username.")
        this.resetInput()
    }
    if (password.length <= 6){
        alert("Invalid Password")
        this.resetInput()
    }
   
    if(username.length > 1 && password.length > 6 ){
        this.userLogin({username, password})
        this.resetInput()  
    }
  }
   handleEnter = event => {
    event.preventDefault()
    this.handleLogin()
  }
   render() {
    if (this.state.token){
        return (
            <Redirect to={{
                pathname: "/game", /* path not created yet */
                state: {token: this.state.token.key}
            }}
                
            />
        )
    }
    return (
      <div>
        <div className="register-title">
          <p className="username-text">USERNAME</p>
        </div>
        <form onSubmit = {this.handleEnter}>
        
          <input
            onChange={this.handleChange}
            className="input-box"
            type="text"
            placeholder="Username"
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
            placeholder="Password"
            value={this.state.password}
            name="password"
          />
          <br />
          
          <button className="submit-btn">
          <p className="username-text">SUBMIT</p>
          </button>
        </form>
        <br />
        <Link to = "/register">
          <button className="submit-btn">
           <p className="signup-text">SIGN UP</p>
          </button>
        </Link>
      </div>
    );
  }
}
export default LoginPage;