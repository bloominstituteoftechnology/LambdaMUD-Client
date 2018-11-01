import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";

URL = "https://arejay-lambdamud.herokuapp.com/";
const ContainerDiv = styled.div`
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
  // doEverything = e => {

  //   this.login(e)
  //   this.login(e)
  
  // }
  login = e => {
    e.preventDefault();
    axios
      .post(`${URL}api/login/`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        // console.log(this.state.username, this.state.password); //that would explain a lot
        console.log("Authorization:", `Token ${response.data.key}`);
        this.setState({ token: `Token ${response.data.key}` });
        localStorage.setItem("Authorization", `Token ${response.data.key}`);
        // return <Redirect to="/middleman" />
        // return (
        //   <Redirect
        //     to={{
        //       pathname: "/authenticate",
        //       state: {
        //         token: this.state.token
        //       }
        //     }}
        //   />
        // );
        // I'll have to look at the docs. Trying to remember how Redirect works
        // Wait I need to study your code lol
        // OK it seems that redirect only does it's magic if it's being rendered (e.g. in the render function)
        // I think this.props.history.push is easier, but the concern is you need to pass the token, right?
      })
      .catch(err => {
        console.log("login Error:", err.response);
      });
      // return <Redirect path="/play" />
      return <Redirect to="/middleman" />

    // return <Redirect path="/play" />;
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
        <form onSubmit={this.login}>
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
        <div>
          <p>Don't have a username?</p>
          <Link to="/register">
            <button>Register Now!</button>
          </Link>
        </div>
      </ContainerDiv>
    );
  }
}

export default Login;
