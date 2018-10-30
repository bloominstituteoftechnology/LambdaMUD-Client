import React, { Component } from "react";
import axios from "axios";

class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      message: []
    };
  }

  componentDidMount() {
    axios
      .get("https://lambdamud-alee.herokuapp.com/api/adv/move")
      .then(response => {
        this.setState({
          player: response.data
        });
        console.log(response.data);
      })
      .catch(err => console.log(err));
  }

  handleTextChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <h1> Yay LambdaMud!</h1>
        <button onClick={this.handleLogout}>Logout</button>
        <div>
          <ul>
            {/* {this.props.messages.map(message => {
              return (
                <li key={message.id}>
                  <div>{message.senderId}</div>
                  <div>{message.text}</div>
                </li>
              );
            })} */}
          </ul>
        </div>
        <div>
          <form action="">
            <input
              type="text"
              placeholder="Enter Command"
              onChange={this.handleTextChange}
              value={this.state.message}
              name="message"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default GameWindow;
