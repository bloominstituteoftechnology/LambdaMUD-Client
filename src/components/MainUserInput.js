import React from 'react'

class MainUserInput extends React.Component {
  state = {
    userInput: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

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
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            name="userInput"
            type="text"
            onChange={this.handleChange}
            value={this.state.userInput}
          />
          <button type="submit">Send</button>
        </label>
      </form>
    )
  }
}

export default MainUserInput