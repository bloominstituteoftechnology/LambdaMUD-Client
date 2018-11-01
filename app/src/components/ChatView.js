import React, { Component } from 'react';
import '../styles/ChatStyles.css';
import MessageView from '../chatviews/MessageView';

class ChatView extends Component {

  state = {

  }


  
  render(){
    return (
      <div className="chat-view-container">
        <div className="message-thread-container">
          {/* map over messages and player move notifications */}
          {/* <MessageView /> */}
        </div>
        <div className="room-input-container">
          <textarea className="chat-input" placeholder="Enter message to room..." onChange={this.onFieldChange} name="message" ></textarea>
          <button className="send-btn">Send</button>
        </div>
  
      </div>
    )
  }
}

export default ChatView;