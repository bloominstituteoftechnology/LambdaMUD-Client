import React from "react";
import axios from "axios";
import styled from "styled-components";

const StyledLoginButton = styled.button`
  width: 13%;
  padding: 1% 1%;
  font-size: 0.9rem;
  font-weight: bold;
  margin-left: 2%;
`;

const StyledInputField = styled.input`
  width: auto;
  padding: 1% 1%;
  font-size: 0.9rem;
  font-weight: bold;
`;

const StyledLoginDiv = styled.div`
  display: inline; 
  height: 100%;
  width:70% 
`;

const StyledH2 = styled.h2`
display: inline;
margin: 0 2%;
`;
class LoginDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = () => {
    let user = { username: this.state.username, password: this.state.password };
    this.setState({ username: "", password: "" });


    axios
      .post(`https://tomprojectweekmudserver.herokuapp.com/api/login/`, user)
      .then(response => {
        console.log(response);
        console.log(response.data.key);
        localStorage.setItem("token", response.data.key);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <StyledLoginDiv>
        <StyledH2>Username</StyledH2>
        <StyledInputField
          type="text"
          placeholder="username"
          onChange={this.handleInput}
          value={this.state.username}
          name="username"
        />
         <StyledH2>Password</StyledH2>
        <StyledInputField
          type="password"
          placeholder="password"
          onChange={this.handleInput}
          value={this.state.password}
          name="password"
        />
        <StyledLoginButton onClick={this.submit}>Login</StyledLoginButton>
      </StyledLoginDiv>
    );
  }
}

export default LoginDiv;
