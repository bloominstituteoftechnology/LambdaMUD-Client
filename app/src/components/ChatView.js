import React from 'react';

const ChatView = (props) => {

  return (
    <div className="chat-view-container">
      <div className="message-thread-container">
        {/* map over messages and player move notifications */}
      </div>
      <div className="room-input-container">
        <input className="room-input" type="text" onChange={this.onFieldChange} name="message" />
      </div>
    </div>
  )
}

export default ChatView;