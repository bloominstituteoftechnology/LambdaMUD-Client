/**
 * This page takes a new username and password to adds the user to the server.
 * It checks that the password and password confirmation match. Once all info
 * is updated the page redirects the user to the main page.
 */

import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const GameTitle = styled.h1`
  font-family: "Fredericka the Great", regular;
  font-size: 64px;
  text-shadow: 3px 3px 0 darkslategray, -1px -1px 0 darkslategray,
    1px -1px 0 darkslategray, -1px 1px 0 darkslategray, 1px 1px 0 darkslategray;
  color: white;
  text-align: center;
`;
const RegistrationTitle = styled.h1`
  font-family: "Fredericka the Great", regular;
  font-size: 36px;
  text-shadow: 3px 3px 0 darkslategray, -1px -1px 0 darkslategray,
    1px -1px 0 darkslategray, -1px 1px 0 darkslategray, 1px 1px 0 darkslategray;
  color: white;
`;
const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 250px;
`;
const RegistrationInput = styled.input`
  margin: 15px 0;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 0 10px slategray;
  padding-left: 10px;
  font-family: "Fredericka the Great", cursive;
  font-size: 20px;
`;

const RegistrationButton = styled.button`
  margin: 15px 0;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 0 10px slategray;
  padding-left: 10px;
`;

const PageRegistration = styled.div`
  width: 20vw;
  margin: 0 auto;
  text-align: center;
`;
const MismatchContainer = styled.div`
  height: 20px;
  margin: 0 auto;
`;
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: "",
      mismatch: false
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("key");
    if (token) {
      this.props.history.replace("/");
    }
  }

  handleRegistrationChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  registrationHandler = event => {
    event.preventDefault();
    if (this.state.username && this.state.password1 && this.state.password2) {
      if (this.state.password1 === this.state.password2) {
        axios
          .post(
            "https://lambdamud-alee.herokuapp.com/api/registration/",
            this.state
          )
          .then(res => {
            const token = res.data.key;
            localStorage.setItem("key", token);
            this.setState({ mismatch: false });
            this.props.history.push("/");
          })
          .catch(err => console.log(err));
      } else {
        this.setState({ mismatch: true });
      }
    }
  };

  render() {
    return (
      <PageRegistration>
        <GameTitle>LambdaMUD</GameTitle>
        <form autoComplete="off">
          <RegistrationContainer>
            <RegistrationTitle>Player Registration</RegistrationTitle>
            <RegistrationInput
              type="text"
              placeholder="User Name"
              name="username"
              value={this.state.username}
              onChange={this.handleRegistrationChange}
            />
            <RegistrationInput
              type="password"
              placeholder="Password"
              name="password1"
              value={this.state.password1}
              onChange={this.handleRegistrationChange}
            />
            <RegistrationInput
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={this.state.password2}
              onChange={this.handleRegistrationChange}
            />
          </RegistrationContainer>
          <MismatchContainer>
            {this.state.mismatch === false ? (
              <p> </p>
            ) : (
              <p>Passwords do not match!</p>
            )}
          </MismatchContainer>
          <RegistrationButton onClick={this.registrationHandler}>
            Register
          </RegistrationButton>
        </form>
      </PageRegistration>
    );
  }
}

export default Registration;
