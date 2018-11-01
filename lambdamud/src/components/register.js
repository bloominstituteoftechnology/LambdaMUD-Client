import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

class Register extends Component {
  state = {
    username: "",
    password1: "",
    password2:""
  };
  render() {
    return (
      <div className="Register">
        <h1> Join us! </h1>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              value={this.state.username}
              onChange={this.inputChangeHandler}
              placeholder="Username"
              type="text"
              name="username"
            />
          </div>
          <div>
            <input
              value={this.state.password1}
              onChange={this.inputChangeHandler}
              placeholder="Choose a password"
              type="password"
              name="password1"
            />
          </div>
          <div>
              <input
              value={this.state.password2}
              onChange={this.inputChangeHandler}
              placeholder="Confirm your password"
              type="password"
              name="password2" />
          </div>
          <div>
            <button type="submit">Sign Up</button>
            <Link to="/">Already exploring? Sign in here</Link>
          </div>
        </form>
      </div>
    );
  }
  inputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //allows user info to be sent to the database
  submitHandler = event => {
    event.preventDefault();
    const local = 'http://127.0.0.1:8000'
    const herokurl = 'https://lambdamud-griggs.herokuapp.com'
    axios.post(`${herokurl}/api/registration`, this.state).then(res => {
        console.log(res.data);
        const token = res.data.key;
        localStorage.setItem("key", token);
      })
      .catch(err => {
        console.error(err.response);
      });
    console.log("state", this.state);
  };
}
export default Register;
