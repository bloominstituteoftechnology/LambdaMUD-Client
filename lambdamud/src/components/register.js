// Register component -registers new users

import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const RegisterPage = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ba1e33;
  height: 802px;`


const RegisterFormDiv = styled.div`
  margin: 0 auto;
  max-width: 985px;
  width: 100%;
  height:802px;
  padding-top: 90px;
  background-image: url("https://picsum.photos/985/802");
  display: flex;
  justify-content: center;
`;

const RegisterForm = styled.form `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 200px;
  font-size: 21px;
`;

const RegisterInput = styled.input `
  height: 30px;
`;

const RegisterButton = styled.button `
  margin-top: 10px;
  width: 150px;
  height: 40px;
  background-color: #ba1e33;
  color: white;
`;

export default class Register extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    }
  }

  // change username and password in state with dynamic inputs, takes the event and returns updated state
  changer = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

// Registers new user. Takes username and a password (confirmed with password2), returns a token, takes user to gameview
  registerUser = (event) => {
    event.preventDefault();
    if (this.state.username && this.state.password1 && this.state.password2) {
      if(this.state.password1 === this.state.password2) {
        axios.post('https://lambdam-u-d.herokuapp.com/api/registration', this.state).then(res => {
          const token = res.data.key;
          this.setState({
            username: "",
            password1: "",
            password2: ""
          });
            localStorage.setItem('key', token);
            this.props.history.push('/gameview');

        }).catch(e =>  console.log(e.response))
        } else {
        this.setState({errorMsg: 'Passwords do not match!'})
      }
    }
  }

  render() {
    return (
      <RegisterPage>
          <RegisterFormDiv>
            <RegisterForm onSubmit={this.registerUser}>
              <label >Username:</label>
              <RegisterInput onChange={this.changer} type="text" id="username" name="username" placeholder="Username..." value={this.state.username} />

              <label>Password:</label>
              <RegisterInput onChange={this.changer} type="text" id="password1" name="password1" placeholder="Password..." value={this.state.password1} />

              <label>Retype password:</label>
              <RegisterInput onChange={this.changer} type="text" id="password2" name="password2" placeholder="Password..." value={this.state.password2} />

              <RegisterButton type="submit">Register</RegisterButton>
            </RegisterForm>
          </RegisterFormDiv>
        </RegisterPage>
    )
  }
}
