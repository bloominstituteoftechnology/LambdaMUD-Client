import React, { Component } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import PlayerList from "./PlayerList";
import RoomDetails from "./RoomDetails";
import ChatBox from "./ChatBox";

const URL = "http://js-lambdamud.herokuapp.com";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "50px 50px 0"
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Game extends Component {
  state = {
    players: [],
    command: "",
    roomTitle: "",
    roomDescription: "",
    err: "",
    messages: [],
    uuid: "",
    username: "",
    token: ""
  };

  pusher = new Pusher("44a9090fbf1d10e8517e", { cluster: "us2" });

  async componentDidMount() {
    if (localStorage.getItem("js-lambdamud")) {
      const key = localStorage.getItem("js-lambdamud");
      const options = {
        headers: {
          Authorization: `Token ${key}`
        }
      };
      try {
        const initialize = await axios.get(URL + "/api/adv/init/", options);
        const broadcast = this.pusher.subscribe(
          `p-channel-${initialize.data.uuid}`
        );
        broadcast.bind("broadcast", data =>
          this.receiveData(data.message, false)
        );
        this.setState({
          players: initialize.data.players,
          roomTitle: initialize.data.title,
          roomDescription: initialize.data.description,
          uuid: initialize.data.uuid,
          username: initialize.data.name,
          token: key
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  receiveData = (message, wipeCmd = true) => {
    const feed = this.state.messages.slice();
    feed.unshift(message);
    let command = wipeCmd ? "" : this.state.command;
    this.setState({ messages: feed, command });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async e => {
    e.preventDefault();
    let command = this.state.command.split(" ");
    const options = {
      headers: {
        Authorization: `Token ${this.state.token}`
      }
    };
    switch (command[0]) {
      case "say":
        let message = command.slice(1).join(" ");
        try {
          let response = await axios.post(
            URL + "/api/adv/say",
            { message },
            options
          );
          if (response.data.success) {
            this.receiveData(response.data.success);
          }
        } catch (e) {
          console.log(e);
        }
        break;
      case "n":
      case "e":
      case "s":
      case "w":
        try {
          let response = await axios.post(
            URL + "/api/adv/move",
            { direction: command[0] },
            options
          );
          this.setState({
            command: '',
            players: response.data.players,
            roomTitle: response.data.title,
            roomDescription: response.data.description,
          });
        } catch (e) {
          console.log(e);
        }
        break;
      default:
        this.receiveData("I don't understand that command");
    }
  };

  render() {
    const { root, paper } = this.props.classes;
    const {
      command,
      players,
      roomTitle,
      roomDescription,
      messages
    } = this.state;
    return (
      <div className={root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper className={paper}>
              <PlayerList players={players} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={paper}>
              <RoomDetails title={roomTitle} description={roomDescription} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={paper}>
              <ChatBox
                messages={messages}
                change={this.onChange}
                submit={this.onSubmit}
                command={command}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Game);
