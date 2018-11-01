import React from "react";
import axios from 'axios';

// import {Route} from "react-router-dom";
// import axios from "axios";

// this.props.channel === channel instance 

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",

    };
  }

  componentDidMount() {
    // bind your channel here
    // in the callback function of the bind, update whatever
    // is displaying your chat
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getToken = () => {
    let token = localStorage.getItem("Token");
    return token;
  };
  

  userMessage = event => {
    event.preventDefault();
    const token = this.getToken();
    let config = {
      headers: {
        Authorization: `Token ${token}`
      }
    };
    const message = {
      message: this.state.message
    };
    axios
      .post(
        "https://lambdamudvleon.herokuapp.com/api/adv/say/",
        message,
        config
      )
      .then(response => {
        this.setState({ message: response.data.message });
        console.log(this.state.message);

      })
      .catch(err => console.log("Error: ", err));
  };

  render() {
    return (
      <div className="chat-container">
        <h4>Messenger</h4>
        <div>{this.props.archmessage}</div>
       
        <input
          type="text"
          name="message"
          value={this.state.message}
          onChange={this.onChange}
        />
        <button className="send-btn" onClick={this.userMessage}>
          SEND
        </button>
      </div>
    );
  }
}

export default Chat;
