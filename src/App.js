import React, { Component } from 'react'
import styled from 'styled-components'
import logo from './logo.svg'
import Signup from './components/Signup'
import Login from './components/Login'
import Main from './components/Main'
import axios from 'axios'

class App extends Component {
  state = {
    creatingUser: false,
    isLoggedIn: false,
  }

  signup = (newUserObject) => {
    axios.post('https://lambdamud-timh1203.herokuapp.com/api/registration/', newUserObject)
      .then(resp => {
        localStorage.setItem('token', resp.data.key)
        this.setState({ isLoggedIn: true })
      })
      .catch(function (error) {
        console.log(error);
      });
    this.toggleCreateUserForm()
  }

  login = (userObject) => {
    axios.post('https://lambdamud-timh1203.herokuapp.com/api/login/', userObject)
      .then(resp => {
        localStorage.setItem('token', resp.data.key)
        this.setState({ isLoggedIn: true })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  toggleCreateUserForm = () => {
    this.setState({ creatingUser: !this.state.creatingUser })
  }

  render() {
    return (
      <Div1>
        <Img1 src={logo} alt="logo" />
        <h1>Lambda MUD</h1>
        <h3>Timothy Hoang</h3>
        {
          !this.state.isLoggedIn && !this.state.creatingUser ? (
            <Login
              toggleCreateUserForm={this.toggleCreateUserForm}
              login={this.login}
            />
          ) : null
        }
        {
          !this.state.isLoggedIn && this.state.creatingUser ? (
            <Signup
              toggleCreateUserForm={this.toggleCreateUserForm}
              signup={this.signup}
            />
          ) : null
        }
        {
          this.state.isLoggedIn ? <Main /> : null
        }
      </Div1>
    );
  }
}

const Div1 = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #61dafb;
`
const Img1 = styled.img`
  animation: App-logo-spin1 infinite 30s linear;
  height: 20vmin;
  @keyframes App-logo-spin1 {
    from {
      transform: rotate(360deg);
    }
    to {
        transform: rotate(0deg);
    }
  }
`
export default App;
