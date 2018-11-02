/**
 * This page takes a username and password and checks against a list of valid
 * users from the server. If the login credentials are valid the user is
 * redirected to the main page.
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Registration from "../registration/registration";

const GameTitle = styled.h1`
  font-family: "Fredericka the Great", regular;
  font-size: 64px;
  text-shadow: 3px 3px 0 darkslategray, -1px -1px 0 darkslategray,
    1px -1px 0 darkslategray, -1px 1px 0 darkslategray, 1px 1px 0 darkslategray;
  color: white;
  text-align: center;
`;
const LoginTitle = styled.h1`
  font-family: "Fredericka the Great", regular;
  font-size: 36px;
  text-shadow: 3px 3px 0 darkslategray, -1px -1px 0 darkslategray,
    1px -1px 0 darkslategray, -1px 1px 0 darkslategray, 1px 1px 0 darkslategray;
  color: white;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 250px;
`;
const LoginInput = styled.input`
  margin: 15px 0;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 0 10px slategray;
  padding-left: 10px;
  font-family: "Fredericka the Great", cursive;
  font-size: 20px;
`;
const LoginButtonConstainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px;
`;
const LoginButton = styled.button`
  margin: 15px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 0 10px slategray;
  padding-left: 10px;
`;

const RegistrationButton = styled.button`
  margin: 15px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 0 10px slategray;
  padding-left: 10px;
`;
const MismatchContainer = styled.div`
  height: 20px;
  margin: 0 auto;
  color: red;
`;
const PageLogin = styled.div`
  width: 20vw;
  margin: 0 auto;
  text-align: center;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      mismatch: false
    };
  }

  // handles text changes from an input and adds it to the state.
  handleLoginChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Checks if there are inputs in both input fields. If there are the player
  // can click the login button to submit a POST request to the server. If login
  // credentials are authorized a token is returned, added to localStorage, and
  // the player is redirected to the gamewindow screen. If login credentials are
  // invalid an error message is displayed.
  loginHandler = event => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      axios
        .post("https://lambdamud-alee.herokuapp.com/api/login/", this.state)
        .then(res => {
          const token = res.data.key;
          localStorage.setItem("key", token);
          this.props.history.push("/");
        })
        .catch(this.setState({ mismatch: true}));
    }
  };

  render() {
    return (
      <PageLogin>
        <GameTitle>LambdaMUD</GameTitle>
        <form autoComplete="off">
          <LoginContainer>
            <LoginTitle>Player Login</LoginTitle>
            <LoginInput
              type="text"
              placeholder="User Name"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginChange}
            />
            <LoginInput
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.passwrod}
              onChange={this.handleLoginChange}
            />
            <MismatchContainer>
              {this.state.mismatch === false ? (
                <p> </p>
              ) : (
                <p>Invalid Username or Password</p>
              )}
            </MismatchContainer>
            <LoginButtonConstainer>
              <LoginButton onClick={this.loginHandler}>Login</LoginButton>
              <Link to="/register">
                <RegistrationButton>Register</RegistrationButton>
              </Link>
            </LoginButtonConstainer>
          </LoginContainer>
        </form>
      </PageLogin>
    );
  }
}

export default Login;
