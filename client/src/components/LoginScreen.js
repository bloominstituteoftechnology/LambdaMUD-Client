import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Redirect} from "react-router";
import {loginUser} from './server/fetch';
import axios from "axios"; 

const apiLogin = "https://lambdamud-backend.herokuapp.com/api/login"; // post

class LoginScreen extends Component {
  state = {
    username: "",
    password: "",
    token : "",
  };

  resetFields = () => {
      this.setState({username: "", password: ""})
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  loginUser = credentials => {
    const promise = axios.post(apiLogin, credentials);
    promise
      .then(response => {
        console.log(response.data);
        this.setState({token: response.data})
      })
  
      .catch(error => {
        console.log(error);
      });
  };

  handleLogin = () => {
    const username = this.state.username.slice()
    const password = this.state.password.slice()

    if (username.length < 1){
        alert("Invalid Password/username.")
        this.resetFields()
    }
    if (password.length < 6){
        alert("Invalid Password/username")
        this.resetFields()
    }
   
    if(username.length > 1 && password.length > 5 ){
        this.loginUser({username, password})
        this.resetFields()

        
        
    }
  }

  render() {
    console.log(this.state)
    if (this.state.token){
        return (
            <Redirect to={{
                pathname: "/game",
                state: {token: this.state.token.key}
            }}
                
            />
        )
    }
    return (
      <div>
        <div className="title-input mb-1">
          <span className="char1 title-first">U</span>
          <span className="char2 title-second">s</span>
          <span className="char3 title-third">e</span>
          <span className="char4 title-first">r</span>
          <span className="char5 title-second">N</span>
          <span className="char1 title-first">a</span>
          <span className="char2 title-second">m</span>
          <span className="char3 title-third">e</span>
        </div>

        <input
          onChange={this.handleChange}
          className="input-box"
          type="text"
          placeholder="Username"
          value={this.state.username}
          name="username"
        />
        <div className="title-input">
          <span className="char1 title-first">P</span>
          <span className="char2 title-second">a</span>
          <span className="char3 title-third">s</span>
          <span className="char4 title-first">s</span>
          <span className="char5 title-second">w</span>
          <span className="char1 title-first">o</span>
          <span className="char2 title-second">r</span>
          <span className="char3 title-third">d</span>
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
        <button onClick = {this.handleLogin} className="web-btn">
          <span className="char1 title-first">S</span>
          <span className="char2 title-second">u</span>
          <span className="char3 title-third">b</span>
          <span className="char4 title-first">m</span>
          <span className="char5 title-second">i</span>
          <span className="char1 title-first">t</span>
        </button>
        <br />
        <Link to = "/register">
          <button className="web-btn">
            <span className="char2 title-second">S</span>
            <span className="char3 title-third">i</span>
            <span className="char4 title-first">g</span>
            <span className="char5 title-second">n</span>
            <span className="char1 title-first">U</span>
            <span className="char2 title-second">p</span>
          </button>
        </Link>
      </div>
    );
  }
}
export default LoginScreen;
