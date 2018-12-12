// Form to handle user inputs for logging in
// Passes user information back to App.js
import React from 'react'
import styled from 'styled-components'

// Styled-Components
const Form1 = styled.form`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px black;
  padding: 1rem;
`
const Label = styled.label`
  margin: 1rem;
`
const Input = styled.input`
  border-radius: 2px;
  padding: 5px;
  font-size: 16px;
  text-align: center;
  margin: 0 1rem;
  box-shadow: 0 2px 2px gray;
  border: none;
`
const Button = styled.button`
  width: 50%;
  margin: 1rem auto;
  background: #61DAFB;
  padding: 5px;
  font-size: 16px;
  border-radius: 2px;
  border: none;
  box-shadow: 0 2px 2px gray;
  &:hover {
    cursor: pointer;
  }
`
const P1 = styled.p`
  text-decoration: underline;
  cursor: pointer;
`

export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
  }

  // FUNCTION: holds user information in state
  // ARGUMENTS: event argument to prevent default action
  // RETURNS: updates state with computed property names
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // FUNCTION: passes user login information back to App
  // ARGUMENTS: event argument to prevent default action
  // RETURNS: send user information to login method in APP, resets state
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.login({
      "username": this.state.username,
      "password": this.state.password
    })
    this.setState({
      username: "",
      password: "",
    })
  }

  render() {
    return (
      <Form1 onSubmit={this.handleSubmit}>
        <Label>
          <Input
            name="username"
            type="text"
            placeholder="👤 username"
            onChange={this.handleChange}
            value={this.state.username}
          />
        </Label>
        <Label>
          <Input
            name="password"
            type="password"
            placeholder="🔑 password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        </Label>
        <Button>Login</Button>
        <P1 onClick={this.props.toggleCreateUserForm}>Create Account</P1>
      </Form1>
    )
  }
}
