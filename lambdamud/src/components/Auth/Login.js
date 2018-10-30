import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

URL = "https://arejay-lambdamud.herokuapp.com/";
ContainerDiv = styled.div`
  background-color: blue;
`;
class Login extends Component {
  state = {
    username: "",
    password: "",
    token: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    axios
      .post(`${URL}api/adv/login/`, {
        username: this.state.username,
        password: this.state.password
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
            name="password"
            onChange={this.handleInputChange}
            value={this.state.password}
            placeholder="Password"
            type="password"
          />
          <button>Connect</button>
        </form>
      </ContainerDiv>
    );
  }
}

export default Login;
