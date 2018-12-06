import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Pusher from "pusher-js";

class Window extends Component {
  state = {
    username: "",
    uuid: "",
    room: "",
    description: "",
    players: [],
    chat: [],
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
          chat: []
        });
        // start new pusher session
        const pusher = new Pusher("7a4b582cb6d9925b7626", {
          cluster: "ap2",
          encrypted: true,
          authEndpoint: "pusher/auth"
        });
        // create new pusher channel and subscribe user
        const channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
        // bind user to channel and broadcast message in chat, concat array so react reloads
        channel.bind("broadcast", userMessage => {
          let array = this.state.chat.concat(userMessage.message);
          this.setState({
            chat: array,
            input: "",
            players: res.data.players
          });
        });
        // channel.bind("broadcast", direction => {
        //   let array = this.state.chat.concat(direction.message);
        //   this.setState({
        //     input: "",
        //     players: res.data.players
        //   })
        // });
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
          console.log(res)
          if (!res.data.error_msg) {
            this.setState({
              username: res.data.name,
              uuid: res.data.uuid,
              room: res.data.title,
              description: res.data.description,
              players: res.data.players,
              chat: this.state.chat,
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
      // concat new chat with old into new array, set state for reload
      .then(res => {
        let array = [`${this.state.username} says ${userMessage}`];
        array.concat(
          this.state.chat
        );
        this.setState({
          chat: array,
          input: "",
          players: res.data.players
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
            <Col sm="6">
              <div>
                <h4>User Input</h4>
                <input
                  name="input"
                  onChange={this.handleChange}
                  value={this.state.input}
                />
              </div>
              <div className="buttons">
                <Link to={"/api/adv/move"}>
                  <button onClick={this.onSubmitMove}>Move</button>
                </Link>
                <Link to={"/api/adv/say"}>
                  <button onClick={this.onSubmitSay}>Speak</button>
                </Link>
              </div>
            </Col>
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
            </Row>
            <Row>
            <Col sm="6">
              <div>
                <h4>Chat</h4>
                <ul>
                  {this.state.chat.map((message, id) => (
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
