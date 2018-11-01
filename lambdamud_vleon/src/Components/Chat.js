import React from "react";
import axios from "axios";
// import Pusher from "pusher-js";

// import {Route} from "react-router-dom";
// import axios from "axios";

// this.props.channel === channel instance
// const url = "https://lambdamudvleon.herokuapp.com/api/adv/say/";

// const APP_KEY = "18b8fc7f40c450c2f420";

// passing componentdidmount done and looping through messages

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      channel: ""
    };
  }

  // bind your channel here
  // in the callback function of the bind, update whatever
  // is displaying your chat
  // componentDidMount() {
  //   // Make sure to streamline them together when you're done
  //   const token = this.getToken();
  //   if (token) {
  //     let config = {
  //       headers: {
  //         Authorization: `Token ${token}`
  //       }
  //     };
  //     axios
  //       .get(url, config)
  //       .then(response => {
  //         const pusher = new Pusher(APP_KEY, {
  //           cluster: "us2",
  //           auth: {
  //             params: { "content-type": "application/json" },
  //             headers: { authorization: `Token ${token}` }
  //           }
  //         });
  //         this.setState({
  //           channel: pusher.subscribe(`p-channel-${response.data.uuid}`)
  //         });
  //         this.state.channel.bind(
  //           "broadcast",
  //           data => {
  //             this.setState({ message: data.message });
  //           },
  //           { direction: pusher }
  //         );
  //       })

  //       .catch(error => console.log("Error: ", error));
  //   }
  // }

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
        <div>
          {this.props.archmessage.map(arch => {
            return <div>{arch}</div>;
          })}
        </div>

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
