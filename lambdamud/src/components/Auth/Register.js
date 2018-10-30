import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

URL = "https://arejay-lambdamud.herokuapp.com/";
ContainerDiv = styled.div`
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

  login = e => {
    axios
      .post(`${URL}api/adv/register/`, {
        username: this.state.username,
        password1: this.state.password,
        password2: this.state.password2
      })
      .then(response => {
        this.state.token = response.data;
        return response.data;
      });
  };
  render() {
    return (
      <ContainerDiv>
        <form>
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
