import React, { Component } from 'react'

class RoomChat extends Component {

  state = {
    message: ''
  }

  onInputChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onChatSubmit = e => {
    e.preventDefault();
    this.props.broadcastMessage(this.state.message)
  }

  render() {
    return (
      <div>
        <h2>Chat</h2>
        <h3>Messages By Others</h3>
        <p>{`${this.props.chatMessage.sentBy}: ${this.props.chatMessage.message}`}</p>
        <form onSubmit={this.onChatSubmit}>
          <div>
            <label htmlFor="chatMessage">Message</label>
            <input
              type="text"
              id="chatMessage"
              name="message"
              value={this.state.message}
              onChange={this.onInputChange}
            />
          </div>
          <button type="submit">Send Message</button>
        </form>

        <h2>Other Players</h2>
        <h3>Player Movements</h3>
        <p>{`${this.props.movementByOthers}`}</p>
      </div>
    )
  }
}

export default RoomChat;
