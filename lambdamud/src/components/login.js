// Login component - allows users to log in

import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LoginPage = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ba1e33;`

const LoginFormDiv = styled.div`
  margin: 0 auto;
  max-width: 998px;
  width: 100%;
  height:900px;
  padding-top: 90px;
  background-image: url("https://picsum.photos/998/900");
  display: flex;
  justify-content: center;
`;

const LoginForm = styled.form `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 200px;
  font-size: 21px;
`;

const LoginButton = styled.button `
  margin-top: 10px;
  width: 150px;
  background-color: #ba1e33;
  color: white;
`;

export default class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

// change username and password in state with dynamic inputs, takes the event and returns updated state
  changer = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

// submits the login information to the API login endpoint, takes password and username and returns a token, takes user to gameview
  handlePWSubmit = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      axios.post('https://lambdam-u-d.herokuapp.com/api/login', this.state).then(res => {
        const token = res.data.key;
        this.setState({
          username: "",
          password: ""
        })
        if (token) {
          this.props.history.push('/gameview');
        } else {
          this.setState({errorMsg: 'Incorrect username or password'})          }
      }).catch(e => console.log(e));
    }
  }

  render() {
    return (
      <LoginPage>
          <LoginFormDiv>
            <LoginForm onSubmit={this.handlePWSubmit}>
              <label >Username:</label>
              <input onChange={this.changer} type="text" id="username" name="username" placeholder="Username..." value={this.state.username} />

              <label>Password:</label>
              <input onChange={this.changer} type="text" id="password" name="password" placeholder="Password..." value={this.state.password} />

              <LoginButton type="submit">Log In</LoginButton>
            </LoginForm>
          </LoginFormDiv>
        </LoginPage>
    )
  }
}
