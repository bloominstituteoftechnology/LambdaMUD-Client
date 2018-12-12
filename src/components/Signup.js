import React from 'react'
import styled from 'styled-components'

class Signup extends React.Component {
  state = {
    username: "",
    password1: "",
    password2: "",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

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
        <Button>Signup</Button>
        <P1 onClick={this.props.toggleCreateUserForm}>Cancel</P1>
      </Form1>
    )
  }
}

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

export default Signup
