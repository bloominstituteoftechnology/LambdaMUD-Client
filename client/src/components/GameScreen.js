import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import {toast} from 'react-toastify'; 

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: true,
      user: "",
      userUUID: "",
      message: "",
      direction: "",
      errors: "",
      messages: [],
      players: [],
      pusher: new Pusher("d9f1711efab6bafc6f93", { cluster: "us2" }), 
      chatMessage: ''
    };
  }

  componentDidMount = () => {
    if (!localStorage.getItem("token")) {
      this.setState({
        authorized: false
      });
      this.props.history.push("/login");
    }

    const headersAuth = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` }
    };
    axios
      .get("https://katia-lambda-mud.herokuapp.com/api/adv/init", headersAuth)
      .then(response => {
        const { name, uuid, title, description, players } = response.data;
        this.setState({
          user: name,
          userUUID: uuid,
          message: `${title}: ${description}`,
          messages: [...this.state.messages, `${title}: ${description}`],
          players: players
        });
        const channel = this.state.pusher.subscribe(
          "p-channel-" + response.data.uuid
        );

        channel.bind("broadcast", response => {
          this.setState({
            message: response.message,
            messages: [...this.state.messages, response.message]
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitHandler = event => {
    const { direction, messages } = this.state;
    event.preventDefault();

    const headersAuth = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` }
    };

    if (
      direction === "e" ||
      direction === "n" ||
      direction === "w" ||
      direction === "s"
    ) {
      axios
        .post("https://katia-lambda-mud.herokuapp.com/api/adv/move/", { direction }, headersAuth)
        .then(response => {
          const { title, description, players } = response.data;
          this.setState({
            message: `${title} : ${description}`,
            messages: [
              ...messages,
              `You went ${direction}`,
              `${title} : ${description}`
            ],
            direction: "",
            players: players
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  sendMessageHandler = event => {
    event.preventDefault(); 
    const headersAuth = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` }
      };
    axios.post("https://katia-lambda-mud.herokuapp.com/api/adv/say", {message: this.state.chatMessage}, headersAuth).then(response => {
    this.setState({
            chatMessage: ''
        })
    })
  }

  logOutHandler = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    return (

      <div className="container mt-4">
      <div className = "nav justify-content-between align-items-center">
      <h1>LambdaMUD</h1>
      <button onClick={this.logOutHandler} className="btn btn-warning m-4">
          Log Out
        </button>
      </div>
        
        <div className = "card  ">
        <div className = "card-header">
        <h2> Welcome, {this.state.user} </h2>
        <div className = "instructions">
            <p> Let's Begin! To play enter a direction that you would like to travel in.</p>
            <p> Use [ n, e, s, w ] keys to navigate.</p>
          </div>
        </div>
        <div className = "card-body game-screen  bg-danger">
        
       {this.state.messages.map(message => {
          return (
            <div className="message">
              <p> -->> {message}</p>
            </div>
          );
        }) }
        
        </div>
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <div className="form-group input-group">
            <input
              value={this.state.direction}
              onChange={this.onInputChange}
              type="text"
              placeholder="Enter direction"
              className="form-control"
              name= "direction"
            />
            <span className = "input-group-button">
            <button type="submit" className="btn btn-primary">
              Travel
            </button>
            </span>
          </div>
        </form>
        <div className="error">{this.state.errors}</div>
        <div className = "row justify-content-between">
        <div className="players card col-md-4 ">
        <div className = "card-header">
          <h2> Players in Room </h2>
          </div>
        <div className = "card-body">
          {this.state.players.map(player => {
            return <div>{player}</div>;
          })}
          </div>
        </div>
        <div className = "send-message card col-md-4">
        <div className = "card-header">
        <h3>Send Message to Players in Room:</h3>
        </div>
        <div className = "card-body">
          <form onSubmit = {this.sendMessageHandler} className = "form-group input-group">
            <input value = {this.state.chatMessage} onChange = {this.onInputChange} placeholder = "Message"  type = "text" className = "form-control" name = "chatMessage"/>
            <span className= "input-group-btn">
            <button type = "submit" className = "btn btn-success">Send</button>
            </span>
          </form>
          </div>
        </div>
        </div>
        
      </div>
    );
  }
}

export default GameScreen;
