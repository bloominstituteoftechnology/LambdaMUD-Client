import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Login from "./Login";

URL = "https://arejay-lambdamud.herokuapp.com/";
const ContainerDiv = styled.div`
  background-color: blue;
`;
class Register extends Component {
  state = {
    username: "",
    password1: "",
    password2: "",
    token: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  register = e => {
    e.preventDefault();
    axios
      .post(`${URL}api/registration/`, {
        username: this.state.username,
        password1: this.state.password1,
        password2: this.state.password2
      })
      .then(response => {
        this.setState({ token: `Token ${response.data.key}` });
        localStorage.setItem("Authorization", `Token ${response.data.key}`);

        // return (
        //   <Redirect
        //     to={{
        //       pathname: "/middleman",
        //       state: {
        //         authorization: this.state.token
        //       }
        //     }}
        //   />
        // );
      })
      .catch(err => err.response);
  };
  render() {
    if (this.state.token) {
      return (
        <Redirect
          to={{
            pathname: "/middleman",
            state: {
              authorization: this.state.token
            }
          }}
        />
      );
    }
    return (
      <ContainerDiv>
        <form onSubmit={this.register}>
          <input
            name="username"
            onChange={this.handleInputChange}
            value={this.state.username}
            placeholder="Login"
          />
          <input
            name="password1"
            onChange={this.handleInputChange}
            value={this.state.password1}
            placeholder="Password"
            type="password"
          />
          <input
            name="password2"
            onChange={this.handleInputChange}
            value={this.state.password2}
            placeholder="Verify Password"
            type="password"
          />

          <button>Join the realm</button>
        </form>
      </ContainerDiv>
    );
  }
}

export default Register;
