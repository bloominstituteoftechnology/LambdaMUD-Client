//This  file will implement the ability to Login and create inputs and buttons to submit login credentials. 
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Redirect} from "react-router";
import axios from "axios"; 

const apiLogin = "https://lambdamud-backend.herokuapp.com/api/login"; // post

class LoginScreen extends Component {
  state = {
    username: "",
    password: "",
    token : "",
  };

  resetFields = () => {
      //will reset the username and password fields to blank strings
      this.setState({username: "", password: ""})
  }

  handleChange = event => {
    //handles the input changes on username and password 
    this.setState({ [event.target.name]: event.target.value });
  };

  loginUser = credentials => {
    //this method will use the post method to log the user in
    //relies on the handleLogin function as it is called inside of that function
    //data once it gets here should already be checked for correct order. 
    const promise = axios.post(apiLogin, credentials);
    promise
      .then(response => {
        console.log(response.data);
        localStorage.setItem('jwt', response.data.key);
        // this.props.history.push("/game")
        this.setState({token: response.data})
      })
  
      .catch(error => {
        console.log(error);
      });
  };

  handleLogin = () => {
    //This function will check the username and password making sure they are meeting requirements before sending off the request
    // if they meet the requriements it will use the loginuser method on username and password
    //Whether the requirements are met or not the fields will be reset using the resetFields method
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
          <span className="char1 title-third">a</span>
          <span className="char2 title-first">m</span>
          <span className="char3 title-second">e</span>
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
          <span className="char1 title-third">o</span>
          <span className="char2 title-first">r</span>
          <span className="char3 title-second">d</span>
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
          <span className="char1 title-third">t</span>
        </button>
        <br />
        <Link to = "/register">
          <button className="web-btn">
            <span className="char2 title-first">S</span>
            <span className="char3 title-second">i</span>
            <span className="char4 title-third">g</span>
            <span className="char5 title-first">n</span>
            <span className="char1 title-second">U</span>
            <span className="char2 title-third">p</span>
          </button>
        </Link>
      </div>
    );
  }
}
export default LoginScreen;
