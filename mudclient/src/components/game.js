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
    color: theme.palette.text.secondary,
    height: '300px',
    overflowY: 'scroll'
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
    token: "",
    msgID: 0
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
        broadcast.bind("broadcast", data =>{
          console.log(data);
          if(data.add){
            this.receiveData(data.message, false, 'add', data.add);
          }else if(data.remove){
            this.receiveData(data.message, false, 'remove', data.remove);
          }else{
            this.receiveData(data.message, false)
          }
        }
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

  receiveData = (message, wipeCmd = true, changePlayer=false, player='') => {
    console.log(player);
    const feed = this.state.messages.slice();
    feed.unshift({ message, id: this.state.msgID });
    let command = wipeCmd ? "" : this.state.command;
    if(changePlayer && changePlayer === 'add' && player !== this.state.username){
      const players = this.state.players.slice();
      players.push(player);
      this.setState({ messages: feed, command, id: this.state.msgID + 1, players });

    }else if(changePlayer && changePlayer === 'remove' && player !== this.state.username){
      const players = this.state.players.filter(p => p !== player);
      this.setState({ players });
    }else{
      this.setState({ messages: feed, command, id: this.state.msgID + 1 });
    }
  };

  // addPlayer = player => {
  //   if(player !== this.state.username){
  //     const players = this.state.players.slice();
  //     players.push(player);
  //     this.setState({ players })
  //   }
  // };
  //
  // removePlayer = player => {
  //   if(player !== this.state.username){
  //     const players = this.state.players.filter(p => p !== player);
  //     this.setState({ players });
  //   }
  // };

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
          this.receiveData(`You moved in ${command[0]} direction`);
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
