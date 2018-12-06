import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Pusher from 'pusher-js';
// const messages = ["Lisa says Hello", "Jakobi says I Win!"];

// create basic state, haven't figured out empty messages
class Window extends Component {
  state = {
    username: "",
    uuid: "",
    room: "",
    description: "",
    players: [],
    messages: [],
    input: ""
  };

  // save form input to state
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // get the token from local storage
  componentDidMount() {
    const token = {
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`
      }
      
    };
    
    // Use init and token to start game
    axios
      .get("https://lisacee-mud.herokuapp.com/api/adv/init", token)
      .then(res => {
        this.setState({
          username: res.data.name,
          uuid: res.data.uuid,
          room: res.data.title,
          description: res.data.description,
          players: res.data.players,
          messages: []
        });
        // start new pusher session
        const pusher = new Pusher("7a4b582cb6d9925b7626", {
          cluster: "ap2",
          encrypted: true,
          authEndpoint: "pusher/auth"
        });
        // 
        const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
        channel.bind("broadcast", userMessage => {
          let array = this.state.messages.concat(userMessage.message);
          this.setState({
            messages: array,
            input: ""
          });
        });
      })
      // error handling
      .catch(error => {
        console.log(error.response.data);
      });
  }
  // take direction input + token to move
  onSubmitMove = () => {
    const direction = this.state.input;
    const token = {
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`
      }
    };
    if (this.state.input === "s" || "n" || "e" || "w") {
      console.log(this.state.input);
      axios
        .post(
          "https://lisacee-mud.herokuapp.com/api/adv/move",
          { direction: direction },
          token
        )
        .then(res => {
  
          if (!res.data.error_msg) {
            this.setState({
              username: res.data.name,
              uuid: res.data.uuid,
              room: res.data.title,
              description: res.data.description,
              players: res.data.players,
              messages: this.state.messages,
              input: ""
            });
          } else {
            this.setState({
              input: ""
            });
            alert(res.data.error_msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  // not crazy about having two buttons, but this almost works
  onSubmitSay = () => {
    // get token from local storage
    const token = {
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`
      }
    };
   
    const userMessage = this.state.input;
    // take message and token and post to ../say
    axios
      .post(
        "https://lisacee-mud.herokuapp.com/api/adv/say",
        { message: userMessage },
        token
      )
      // concat new messages with old into new array, set state for reload
      .then(res => {
        let array = this.state.messages.concat(`${this.state.username} says ${userMessage}`);
        this.setState({
          messages: array,
          input: ""
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="window">
        <Container>
          <Row>
            <div id="room">
              <h4>{this.state.room}</h4>
              <p>{this.state.description}</p>
              <p>*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*</p>
            </div>
          </Row>
          <Row>
            <div>
              <h4>User Input</h4>
              <input
                name="input"
                onChange={this.handleChange}
                value={this.state.input}
              />
            </div>
          </Row>
          <Row>
            <div className="buttons">
              <Link to={"/api/adv/move"}>
                <button onClick={this.onSubmitMove}>Move</button>
              </Link>
              <Link to={"/api/adv/say"}>
                <button onClick={this.onSubmitSay}>Speak</button>
              </Link>
            </div>
          </Row>
          <Row>
            <Col sm="6">
              <div>
                <h4>Players</h4>
                <ul>
                  {this.state.players.map((name, id) => (
                    <li key={id}>*{name}</li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col sm="6">
              <div>
                <h4>Messages</h4>
                <ul>
                  {this.state.messages.map((message, id) => (
                    <li key={id}>*{message}</li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Window;
