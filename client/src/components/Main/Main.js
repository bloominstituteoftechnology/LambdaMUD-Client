import React, { Component } from "react";
import { Card, CardText, CardColumns } from "reactstrap";

import axios from "axios";

class Main extends Component {
  state = {
    uuid: "",
    name: "",
    title: "",
    description: "",
    players: [],
    chat: [],
    direction: ""
  };
  //INITIALIZE
  componentDidMount() {
    const token = "Token " + JSON.parse(localStorage.getItem("jwt"));
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
    axios
      .get("http://localhost:8000/api/adv/init/", requestOptions)
      .then(response => this.setState(response.data))
      .catch(error => console.error(error));
  }
  //MOVE
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const token = "Token " + JSON.parse(localStorage.getItem("jwt"));
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    };
    axios
      .post(
        "http://localhost:8000/api/adv/move/",
        { direction: this.state.direction },
        requestOptions
      )
      .then(response => this.setState(response.data))
      .catch(error => console.error(error));
  };
  //Adventure
  render() {
    console.warn(this.state);
    return (
      <div className="Adventure">
        <h1>Adventure</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            name="direction"
            type="text"
            value={this.state.direction}
            onChange={this.handleChange}
            placeholder="Move here"
          />
          <button type="submit">Send</button>
        </form>
        <CardColumns>
          <Card body>
            <CardText>{this.state.title}</CardText>
          </Card>
          <Card body>
            <CardText>{this.state.description}</CardText>
          </Card>
        </CardColumns>
      </div>
    );
  }
}

export default Main;
