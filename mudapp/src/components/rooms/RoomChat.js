import React, { Component } from 'react'

import { ChatSection, ChatForm, RecentChats } from './RoomStyles';


class RoomChat extends Component {
  state = {
    message: '',
    messageSent: false
  }

  onInputChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onChatSubmit = e => {
    e.preventDefault();
    this.setState({message: '', messageSent: true})
    setInterval(() => this.setState({messageSent: false}), 3000);
    this.props.broadcastMessage(this.state.message)
  }

  render() {
    return (
      <ChatSection>
        <h1>Chat</h1>
        <RecentChats>
          <h3>Messages By Others</h3>
          {this.props.chatMessage.sentBy === '' ?
            <p>No messages..</p>
            :
            <p>{`${this.props.chatMessage.sentBy}: ${this.props.chatMessage.message}`}</p>
          }
        </RecentChats>
        <ChatForm onSubmit={this.onChatSubmit}>
          <label htmlFor="chatMessage">Message</label>
          <input
            type="text"
            id="chatMessage"
            name="message"
            value={this.state.message}
            onChange={this.onInputChange}
          />
          <button type="submit">Send Message</button>
          {this.state.messageSent ?
            <p>Message Sent!</p>
            :
            null        
          }
        </ChatForm>
      </ChatSection>
    )
  }
}

export default RoomChat;
