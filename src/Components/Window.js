import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
// const players = ["Lola", "Lisa", "Jakobi", "Baxter"];
// const messages = ["Lisa says Hello", "Jakobi says I Win!"];

class Window extends Component {
  state = {
    username: "",
    uuid: "",
    room: "",
    description: "",
    players: [],
    messages: ["Welcome"],
    input: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    const token = {
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`
      }
    };

    axios
      .get("https://lisacee-mud.herokuapp.com/api/adv/init", token)
      .then(res => {
        // console.log("RES", res);
        this.setState({
          username: res.data.name,
          uuid: res.data.uuid,
          room: res.data.title,
          description: res.data.description,
          players: res.data.players,
          messages: ["Welcome"]
        });
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  onSubmit = () => {
    const direction = this.state.input;
    const token = {
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`
      }
    };
    if (this.state.input.value === "s" || "n" || "e" || "w") {
      axios
        .post(
          "https://lisacee-mud.herokuapp.com/api/adv/move",
          { direction: direction },
          token
        )
        .then(res => {
          if(!res.data.error_msg) {
            this.setState({
              username: res.data.name,
              uuid: res.data.uuid,
              room: res.data.title,
              description: res.data.description,
              players: res.data.players,
              messages: this.state.messages,
              input: ""
            });
          }
          else {
            this.setState({
              input: ""
            });
            alert(res.data.error_msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("STATE", this.state);
      const userMessage = this.state.input;
      console.log("MESSAGE", userMessage);
      axios
        .post(
          "https://lisacee-mud.herokuapp.com/api/adv/say",
          { message: userMessage },
          token
        )
        .then(res => {
          let array = this.state.messages.concat(userMessage);
          console.log("ARRAY", array);
          this.setState({ messages: array });
        })
        .catch(error => {
          console.log(error);
        });
    }
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
            <Link to={ "/api/adv/move" }>
              <button onClick={ this.onSubmit }>Move</button>
            </Link>
            <Link to={ "/api/adv/say" }>
              <button onClick={ this.onSubmit }>Speak</button>
            </Link>
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
