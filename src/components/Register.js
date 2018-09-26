import React, { Component } from "react";
import axios from 'axios';
import { Form, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
    margin-left: 10px;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: grey;
    }
`;
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerHandler = e => {
    e.preventDefault();
    const user = {username: this.state.username, password1: this.state.password1, password2: this.state.password2};
    axios
      .post('https://blakes-lambda-mud.herokuapp.com/api/registration', user)
      .then(response => {
        console.log(response)
        localStorage.setItem('key', response.data.key);
        this.props.history.push('/');
      })
      .catch(err => console.log(err.response))
  };

  render() {
    return (
      <Form>
        <h3>Register</h3>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={this.state.username}
          onChange={this.inputHandler}
          style={{ width: "35vw", margin: "10px auto" }}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password1"
          value={this.state.password}
          onChange={this.inputHandler}
          style={{ width: "35vw", margin: "10px auto" }}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={this.state.password2}
          onChange={this.inputHandler}
          style={{ width: "35vw", margin: "10px auto" }}
        />
        <Button onClick={this.registerHandler}>
          Sign up
        </Button>
        <StyledLink to="/login">Login</StyledLink>
      </Form>
    );
  }
}

export default Register;