import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const RegistrationTitle = styled.h1`
  font-family: "Grand Hotel", cursive;
  font-size: 64px;
  text-shadow: 3px 3px 0 darkslategray, -1px -1px 0 darkslategray,
    1px -1px 0 darkslategray, -1px 1px 0 darkslategray, 1px 1px 0 darkslategray;
  color: white;
`;

const RegistrationInput = styled.input`
  margin: 15px 0;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 0 10px slategray;
  padding-left: 10px;
  font-family: "Grand Hotel", cursive;
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
  height: 100vh;
  width: 100vw;
  background: linear-gradient(lightblue, teal, gray);
`;

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("key");
    if(token) {
        this.props.history.replace("/")
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
            .post("https://lambdamud-alee.herokuapp.com/api/registration/", this.state)
            .then(res => {
                const token = res.data.key;
                localStorage.setItem("key", token);
                this.props.history.push("/")
            })
            .catch(err => console.log(err))
        }
        else {
            console.log("Passwords do not match!")
        };
    };
  };

  render() {
    return (
      <PageRegistration className="d-flex justify-content-center">
        <form
          autoComplete="off"
          className="login-container d-flex flex-column justify-content-center"
        >
          <RegistrationTitle>LambdaMUD</RegistrationTitle>
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
          <RegistrationButton onClick={this.registrationHandler}>
            Register
          </RegistrationButton>
        </form>
      </PageRegistration>
    );
  }
}

export default Registration;
