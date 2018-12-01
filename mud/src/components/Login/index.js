import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Button from '../Button';
import './index.css';

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: false,
    redirect: false,
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();
    let data = {
        "username": this.state.username,
        "password": this.state.password
    }
    axios.post("https://lambda-mud-alex.herokuapp.com/api/login", data)
      .then(response => {
          const key = response.data["key"];
          localStorage.setItem("token", key);
          this.setState({ redirect: true });
        })
        .catch(error => {
            if(this.state.username=== "" || this.state.password === "") {
              this.setState({ error: true})
            }
        })
    this.setState({ username: "", password: "" });
  }
  render() {
    return(
      <div className="Login">
        <h1 className="Title">Connect To Your World</h1>
        <input
          className="Input"
          type="text"
          name="username"
          placeholder=" Enter Username"
          value={this.state.username}
          onChange={this.handleChange}
          onClick={() => this.setState({ error: false })}
        />
        <input
          className="Input"
          type="password"
          name="password"
          placeholder=" Enter Password"
          value={this.state.password}
          onChange={this.handleChange}
          onClick={() => this.setState({ error: false })}
        />
        {this.state.error ? <p className="Error">Username/Password combination don't match</p> : null}
        <Button event={this.handleSubmit} text="Connect"/>
        {this.state.redirect ? <Redirect to="/window" /> : null}
      </div>
    );
  }
}

export default Login;