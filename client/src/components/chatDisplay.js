import React, { Component } from 'react';
import '../styles/chatDisplay.css';

class ChatDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="Chat-Display">
        {
          this.props.messages.map((msg) => <div>{msg}</div>)
        } 
      </div>
    );
  }
};

export default ChatDisplay;
