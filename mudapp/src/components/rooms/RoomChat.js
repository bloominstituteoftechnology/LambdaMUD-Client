import React, { Component } from 'react'

import { Section, Form } from './RoomStyles';

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
      <Section className={`${this.props.roomTheme}`}>
        <h2>Chat</h2>
        <h3>Messages By Others</h3>
        {this.props.chatMessage.sentBy === '' ?
          null
          :
          <p>{`${this.props.chatMessage.sentBy}: ${this.props.chatMessage.message}`}</p>
        }
        <Form onSubmit={this.onChatSubmit}>
          <label htmlFor="chatMessage">Message</label>
          <input
            type="text"
            id="chatMessage"
            name="message"
            value={this.state.message}
            onChange={this.onInputChange}
          />
          <button type="submit">Send Message</button>
        </Form>

        <h2>Other Players</h2>
        <h3>Player Movements</h3>
        <p>{`${this.props.movementByOthers}`}</p>
        <h3>Players In Room</h3>
        {this.props.playersInRoom.map(player => {
          return <p key={player}>{player}</p>
        })}
      </Section>
    )
  }
}

export default RoomChat;
