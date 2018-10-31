import React from "react";

// import {Route} from "react-router-dom";
import axios from "axios";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="chat-container">
        <h4>Messenger</h4>

        {/* render the chat here */}
        <input
          type="text"
          value={this.state.message}
          onchange={this.onChange}
        />
        <div className="send-btn">
            SEND
        </div>
      </div>
    );
  }
}

export default Chat;
