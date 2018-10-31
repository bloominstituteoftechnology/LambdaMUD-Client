import React, { Component } from "react";
import axios from "axios";
// import { ThemeProvider } from "styled-components";

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    const { username, password1, password2 } = this.state;
    const userData = {
      username,
      password1,
      password2
    };

    axios
      .post("https://lit-eyrie-95325.herokuapp.com/api/registration/", userData)
      .then(response => {
        localStorage.setItem("token", response.data.key);
        this.setState({
          username: "",
          password1: "",
          password2: ""
        });
        this.props.history.push(
          "https://lit-eyrie-95325.herokuapp.com/api/adv/init/"
        );
      });
  };

  render() {
    return (
      <div>
        <h2>Registration</h2>
        <form onSubmit={this.onSubmitHandler}>
          <input
            onChange={this.onChangeHandler}
            name="username"
            type="text"
            placeholder="username"
            value={this.state.username}
          />
          <input
            onChange={this.onChangeHandler}
            name="password1"
            type="password"
            placeholder="password"
            value={this.state.password1}
          />
          <input
            onChange={this.onChangeHandler}
            name="password2"
            type="password"
            placeholder="confirm password"
            value={this.state.password2}
          />
          <button type="submit"> Register</button>
        </form>
      </div>
    );
  }
}
