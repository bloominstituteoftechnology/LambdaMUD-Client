import React, { Component } from "react";
import Pusher from "pusher-js";

const moves = {
  n: "n",
  s: "s",
  e: "e",
  w: "w",
  south: "s",
  north: "n",
  east: "e",
  west: "w"
};
const commands = {
  say: "say",
  grab:"grab",
  drop:"drop",
  i:"i"
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    this.props.fetchInitInfo(token);
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    if (this.props.uuid !== prevProps.uuid) {
      const pusher = new Pusher("a5a7d6f6a9d48903eddc", {
        cluster: "us2",
        encrypted: true
      });
      const channel = pusher.subscribe(`p-channel-${this.props.uuid}`);
      channel.bind("broadcast", data =>
        this.props.fetchNewMessage(data.message)
      );
    }
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    const command = this.state.text.split(" ");
    if (moves[command[0]]) {
      this.props.movePlayer(moves[command[0]], token);
    } else if (commands[command[0]] === "say") {
      command.shift();
      let message = command.join(" ");
      this.props.talkPlayer(message, token);
    } else if (commands[command[0]] === "grab") {
      command.shift();
      let item = command.join(" ");
      this.props.grabItem(item, token);
    } else if (commands[command[0]] === "drop") {
      command.shift();
      let item = command.join(" ");
      this.props.dropItem(item, token);
    } else if (commands[command[0]] === "i") {
      command.shift();      
      this.props.fetchInventory(token);
    }
    
    this.setState({ text: "" });
  };

  render() {console.log(this.props)
    return (
      <div className="home-wrap">
        <div className="main">
          <h2 className="main-title">{this.props.name}'s Adventure</h2>
          <div className="main-inner">
            <div className="message-log">
              {this.props.data.map((message, index) => {
                return (
                  <div key={index} className="message">
                    {message}
                  </div>
                );
              })}
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.messagesEnd = el;
                }}
              />
            </div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="text"
                onChange={this.handleChange}
                value={this.state.text}
                placeholder="Enter Command"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
