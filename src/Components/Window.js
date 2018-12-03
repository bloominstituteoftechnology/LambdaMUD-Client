import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import {Link} from 'react-router-dom';
// const players = ["Lola", "Lisa", "Jakobi", "Baxter"];
const messages = ["Lisa says Hello", "Jakobi says I Win!"];

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
        console.log("RES", res);
        this.setState({
          username: res.data.name,
          uuid: res.data.uuid,
          room: res.data.title,
          description: res.data.description,
          players: res.data.players,
          messages: ["Lisa says Hello", "Jakobi says I Win!"],
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
    }
    console.log(token)
    if (this.state.input.value === "s" || "n" || "e" || "w") {
      axios
      .post("https://lisacee-mud.herokuapp.com/api/adv/move", {"direction": direction}, token)
      .then(res => {
        this.setState({
          username: res.data.name,
          uuid: res.data.uuid,
          room: res.data.title,
          description: res.data.description,
          players: res.data.players,
          messages: ["Lisa says Hello", "Jakobi says I Win!"],
        })
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
  render() {
    console.log("STATE", this.state);
    return <div className="window">
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
              <input name="input" onChange={this.handleChange} />
              <Link to={"/api/adv/move"}>
                <button onClick={this.onSubmit}>Send</button>
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
                  {messages.map((message, id) => (
                    <li key={id}>*{message}</li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>;
  }
}

export default Window;
