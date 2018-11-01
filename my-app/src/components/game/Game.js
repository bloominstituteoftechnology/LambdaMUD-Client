import React, { Component } from "react";
import axios from "axios";
import Pusher from 'pusher-js';
import {TerminalPromptForm, Feed, FeedItems} from '../global-styles/Form'
import {Input, Button, Line} from '../global-styles/Global'

const url = "https://dungeon-pusher-app.herokuapp.com/api/adv/";

class Game extends Component {
  state = {
    name: "",
    title: "",
    description: "",
    players: [],
    error_msg: "",
    speak: "",
    direction: "",
    uuid: "",
    pusher_log: []
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  grabToken() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    }
    const auth_header = {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    };
    return auth_header;
  }

  handleMove = event => {
    event.preventDefault();
    const dir_cmd = {
      direction: this.state.direction
    };
    const auth_header = this.grabToken();
    console.log(dir_cmd);
    axios
      .post(`${url}move`, dir_cmd, auth_header)
      .then(response => {
        console.log(response);
        this.setState({
          name: response.data.name,
          title: response.data.title,
          description: response.data.description,
          players: response.data.players,
          direction: ""
        });
      })
      .catch(err => console.log(err));
  };

  handleSay = event => {
    event.preventDefault();
    const talk = {
      message: this.state.speak
    };
    const auth_header = this.grabToken();
    axios
      .post(`${url}say`, talk, auth_header)
      .then(response => {
        console.log("say response:", response);
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const auth_header = this.grabToken();

    axios
      .get(`${url}init`, auth_header)
      .then(response => {
        console.log(response.data);
        this.setState({
          name: response.data.name,
          title: response.data.title,
          description: response.data.description,
          players: response.data.players,
          uuid: response.data.uuid
        });
        var pusher = new Pusher("0222b38803db3b781489", {
          cluster: "us2"
        });
        var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
        channel.bind("broadcast", data => {
          const pusher_log = this.state.pusher_log.slice();
          pusher_log.push(data.message);
          this.setState({
            pusher_log: pusher_log
          });
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Feed>
      <FeedItems>
        <h3>Location: {this.state.title}</h3>
        <Line />
        <h3>Whats around me? {this.state.description}</h3>
        <Line />
        <h3>
          {" "}
          Who is here?
          <ul>
            {this.state.players.map(player => (
              <li key={player}>{player} </li>
            ))}
          </ul>
        </h3>
        <Line />
        <h3>
          Activity:
          <ul>
            {this.state.pusher_log.map(log => (
              <li key={log}>{log} </li>
            ))}
          </ul>
        </h3>
        <Line />
        </FeedItems>
        <TerminalPromptForm>
          <label>Enter direction [n, s, e, w]</label>
          <Input
            value={this.state.direction}
            placeholder="n, s, e, w"
            onChange={this.handleChange}
            name="direction"
          />
          <Button onClick={this.handleMove}>Move</Button>

          <label>Something to say?</label>
          <Input
            value={this.state.speak}
            placeholder="message"
            onChange={this.handleChange}
            name="speak"
          />
          <Button onClick={this.handleSay}>Speak</Button>
        </TerminalPromptForm>
      </Feed>
    );
  }
}

export default Game;
