import React, { Component } from "react";
import axios from "axios";
import './logincss.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      welcome: true,
      login: false,
      register: false
    };
  }

  handleInput = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  register = (username, password, password2) => {
    axios
      .post(
        "https://liz-mud.herokuapp.com/api/registration/",
        {username:{ username }, password1:{ password }, password2:{ password2 }}
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  login = (username, password) => {
    axios
      .post(
        "https://liz-mud.herokuapp.com/api/login/",
        {username: { username }, password: { password }}
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <div className="loginpage">
        <div className="login">
          <input
            onChange={this.handleInput}
            id="username"
            placeholder="username"
          />
          <input
            onChange={this.handleInput}
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
        <div className="register">
          <input
            onChange={this.handleInput}
            id="username"
            placeholder="username"
          />
          <input
            onChange={this.handleInput}
            id="password"
            placeholder="password"
          />
           <input
            onChange={this.handleInput}
            id="password2"
            placeholder="re-enter password"
          />
          <button
            type="submit"
            onClick={() => this.register(this.state.username, this.state.password, this.state.password2)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
