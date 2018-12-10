import React, { Component } from 'react'
import styled from 'styled-components'
import logo from './logo.svg'
import Signup from './components/Signup'
import Login from './components/Login'

class App extends Component {
  state = {
    creatingUser: false,
  }

  signup = (newUserObject) => {
    const { username, password1, password2 } = newUserObject
    console.log(newUserObject)
    console.log(username, password1, password2)
    this.toggleCreateUserForm()
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
        {this.state.creatingUser ? (
          <Signup
            toggleCreateUserForm={this.toggleCreateUserForm}
            signup={this.signup}
          />
        ) : (
            <Login
              toggleCreateUserForm={this.toggleCreateUserForm}
            />
          )
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
