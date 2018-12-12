// Handles the user information for signing up
// Passes input back to App.js
import React from 'react'
import styled from 'styled-components'

// Styled-Components
const Form1 = styled.form`
  background: #282c34;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 10px black;
  padding: 1rem;
  animation: fadein 3s;
  @keyframes fadein {
    from { opacity: 0; } to { opacity: 1; }
  }
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
  font-family: "Julee";
`
const Button = styled.button`
  width: 50%;
  margin: 1rem auto;
  background: #2C7FCC;
  color: white;
  padding: 5px;
  font-size: 16px;
  border-radius: 2px;
  border: none;
  box-shadow: 0 2px 2px gray;
  font-family: "Julee";
  &:hover {
    cursor: pointer;
    color: #2C7FCC;
    background: black;
    box-shadow: 0 2px 6px #2C7FCC;
  }
`
const P1 = styled.p`
  text-decoration: underline;
  color: #2C7FCC;
  cursor: pointer;
`

export default class Signup extends React.Component {
  state = {
    username: "",
    password1: "",
    password2: "",
  }

  // FUNCTION: holds user input in state
  // ARGUMENTS: event argument to prevent default action
  // RETURNS: updates state with computed property names
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // FUNCTION: double checks if passwords are appropriate, sends all info to <App />
  // ARGUMENTS: event argument to prevent default action
  // RETURNS: sends an user information object to <App />
  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password1 !== this.state.password2) {
      alert("Check your password fields.")
    }
    else if (this.state.password1.length < 9 || this.state.password2.length < 9) {
      alert("Password needs to be at least 8 characters.")
    }
    else {
      this.props.signup({
        "username": this.state.username,
        "password1": this.state.password1,
        "password2": this.state.password2,
      })
    }
    this.setState({
      username: "",
      password1: "",
      password2: "",
    })
  }

  render() {
    return (
      <Form1 onSubmit={this.handleSubmit}>
        <Label>
          <Input
            name="username"
            type="text"
            placeholder="👤 new username"
            onChange={this.handleChange}
            value={this.state.username}
          />
        </Label>
        <Label>
          <Input
            name="password1"
            type="password"
            placeholder="🔑 new password"
            onChange={this.handleChange}
            value={this.state.password1}
          />
        </Label>
        <Label>
          <Input
            name="password2"
            type="password"
            placeholder="✅ confirm password"
            onChange={this.handleChange}
            value={this.state.password2}
          />
        </Label>
        <Button type="submit">Signup</Button>
        <P1 onClick={this.props.toggleCreateUserForm}>Cancel</P1>
      </Form1>
    )
  }
}
