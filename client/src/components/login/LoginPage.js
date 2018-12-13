import React, { Component } from "react";
import axios from "axios";
import "./loginpage.css";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      welcome: true,
      login: false
    };
  }
  handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
   
  login = (username, password) => {
    axios
      .post("https://mudlambdahuthman.herokuapp.com/api/login/", {
        username: username,
        password: password
      })
      .then(response => {
        localStorage.setItem("key", response.data.key);
        this.props.history.push('/adventure')
      })
      .catch(error => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };
  render() {
    return (
      <div className="loginpage"> 
          <input
            onChange={this.handleInput}
            id="username"
            placeholder="username"
          />
          <input
            onChange={this.handleInput}
            type="password"
            id="password"
            placeholder="password"
          />
          <button
            type="submit"
            onClick={() => this.login(this.state.username, this.state.password)}
          >
            Submit
          </button>
      </div>
    );
  }
}

export default LoginPage;