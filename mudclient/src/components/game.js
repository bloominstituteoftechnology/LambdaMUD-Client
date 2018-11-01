import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import PlayerList from "./PlayerList";
import RoomDetails from "./RoomDetails";
import ChatBox from "./ChatBox";

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
    messages: []
  };

  componentDidMount() {
    //check if user in localstorage, if so, load everything up
    //if not redirect to login
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    let newMsgs = this.state.messages.slice();
    newMsgs.unshift(this.state.command);
    this.setState({ messages: newMsgs, command: '' });
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
