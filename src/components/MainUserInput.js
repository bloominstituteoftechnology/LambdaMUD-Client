// Handles the directions and user chat commands
import React from 'react'
import styled from 'styled-components'

// Styled-Components
const Form1 = styled.form`
  display: flex;
  width: 100%;
  justify-content: center;
`
const Input1 = styled.input`
  flex: 1 1 90%;
  font-size: 1.2rem;
  background: none;
  border: none;
  color: white;
  outline: none;
  &:focus {
    background: none;
    border: none;
    outline: none;
  }
`
const Button1 = styled.button`
  flex: 1 1 10%;
  width: 100px;
  margin: 1rem auto;
  background: #2C7FCC;
  color: white;
  padding: 5px;
  font-size: 16px;
  border-radius: 2px;
  border: none;
  box-shadow: 0 2px 2px gray;
  font-family: "Julee";
  display: flex;
  justify-content: center;
  &:hover {
    cursor: pointer;
    color: #2C7FCC;
    background: black;
    box-shadow: 0 2px 6px #2C7FCC;
  }
`

export default class MainUserInput extends React.Component {
  state = {
    userInput: ""
  }

  // FUNCTION: holds user input in state
  // ARGUMENTS: event argument to prevent default action
  // RETURNS: updates state with computed property names
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // FUNCTION: check/splits userinput and passes back to Main
  // ARGUMENTS: event argument to prevent default action
  // RETURNS: returns a string of the direction or user message
  handleSubmit = (e) => {
    e.preventDefault()
    const { userInput } = this.state
    const directions = ["n", "e", "s", "w"]
    if (directions.includes(userInput)) {
      this.props.move({ "direction": userInput })
      this.setState({ userInput: "" })
    }
    else if (userInput.includes("/s ") || userInput.includes("/say ")) {
      let split
      if (userInput.includes("/s ")) { split = userInput.split("/s") }
      else if (userInput.includes("/say ")) { split = userInput.split("/say") }
      this.props.say(split[1].trim())
      this.setState({ userInput: "" })
    }
    else {
      this.setState({ userInput: "" })
      alert("Enter n, e, s, w, /s <message>, or /say <message>")
    }
  }

  render() {
    return (
      <Form1 onSubmit={this.handleSubmit}>
        <Input1
          name="userInput"
          type="text"
          onChange={this.handleChange}
          value={this.state.userInput}
          placeholder="What is your command?"
        />
        <Button1 type="submit">Send</Button1>
      </Form1>
    )
  }
}