import React, { Component } from "react";
// import "./Login.css";
import styled from "styled-components";

const ContainerL = styled.div`
  height: 100vh;
  justify-content: center;
  background: radial-gradient(ellipse, #bc2a8d, yellow, orange);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 900px;
`;

const Loginst = styled.div`
  width: 100px;
  flex-direction: column;
  margin-right: 20px;
`;

const LoginButton = styled.button`
  height: 100%;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onChangeHandler = e => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = e => {
    event.preventDefault();
    const { username, password } = this.state;
    const userData = {
      username,
      password
    };
    axios
      .post("https://lit-eyrie-95325.herokuapp.com/api/login/", userData)
      .then(response => {
        localStorage.setItem("token", response.data.key);
        this.setState({
          username: "",
          password: ""
        });
        this.props.history.push("adventure");
      });
  };
  render() {
    return (
      <ContainerL>
        <h1>MUD</h1>
        <Loginst>
          <form onSubmit={this.onSubmitHandler}>
            <input
              onChange={this.onChangeHandler}
              name="username"
              type="text"
              placeholder="username"
              onChange={this.state.username}
            />
            <input
              onChange={this.onChangeHandler}
              name="password"
              type="password"
              placeholder="password"
              onChange={this.state.password}
            />
            <LoginButton type="submit">Login</LoginButton>
          </form>
        </Loginst>
      </ContainerL>
    );
  }
}

export default Login;
