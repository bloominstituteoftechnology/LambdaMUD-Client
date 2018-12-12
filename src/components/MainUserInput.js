// Handles the directions and chat
import React from 'react'
import { runInThisContext } from 'vm';

export class MainUserInput extends React.Component {
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


handleSubmit = (e) => {
    e.preventDefault()
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
  
