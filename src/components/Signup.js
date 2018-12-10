import React from 'react'
import styled from 'styled-components'

class Signup extends React.Component {
  render() {
    return (
      <div>
        <Form1>
          <Label>
            <Input
              name="username"
              type="text"
              placeholder="👤 new username"
            />
          </Label>
          <Label>
            <Input
              name="password1"
              type="password"
              placeholder="🔑 new password"
            />
          </Label>
          <Label>
            <Input
              name="password2"
              type="password"
              placeholder="🔑 confirm password"
            />
          </Label>
          <Button>Signup</Button>
          <P1 onClick={this.props.toggleCreateUserForm}>Cancel</P1>
        </Form1>
      </div>
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
