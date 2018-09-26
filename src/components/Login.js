import React, { Component } from "react";
import axios from 'axios';
import { Form, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
    margin-left: 10px;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: grey;
    }
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginHandler = e => {
    e.preventDefault();
    const user = {username: this.state.username, password: this.state.password};
    axios
      .post('https://blakes-lambda-mud.herokuapp.com/api/login', user)
      .then(response => {
        console.log(response)
        localStorage.setItem('key', response.data.key);
        this.props.history.push('/');
      })
      .catch(err => console.log(err.response))
  };

  render() {
    return (
      <Form className="login-form">
        <h3>Login</h3>
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
          name="password"
          value={this.state.password}
          onChange={this.inputHandler}
          style={{ width: "35vw", margin: "10px auto" }}
        />
        <Button onClick={this.loginHandler}>
          Log In
        </Button>
        <StyledLink to="/register">Register</StyledLink>
      </Form>
    );
  }
}

export default Login;