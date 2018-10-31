import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import PlayerList from "./PlayerList";

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
    players: ["John", "Joseph", "Mary", "Amber", "Elizabeth"],
    input: ""
  };
  componentDidMount() {
    //check if user in localstorage, if so, load everything up
    //if not redirect to login
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { root, paper } = this.props.classes;
    const { input, players } = this.state;
    return (
      <div className={root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper className={paper}>
              <PlayerList players={players} />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={paper} />
          </Grid>
          <Grid item xs={12}>
            <Paper className={paper} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Game);
