import React, { Component } from "react";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const URL = 'https://js-lambdamud.herokuapp.com/api/login';

const styles = theme => ({
  root: {
    width: "50%",
    margin: "20px auto 0",
    padding: "20px"
  },
  avatar: {
    margin: "10px auto 20px",
    width: 80,
    height: 80
  },
  button: {
    marginTop: 15
  },
  redirect: {
    margin: '20px 0'
  }
});

class login extends Component {
  state = {
    username: "",
    password: "",
    loading: false
  };

  componentDidMount() {
    if(localStorage.getItem('js-lambdamud')){
      this.props.history.push('/');
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async(e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    try{
      let response = await axios.post(URL, user);
      localStorage.setItem('js-lambdamud', response.data.key);
      this.props.history.push('/');
    }catch(e){
      console.log(e)
    }
  };

  render() {
    const { root, avatar, button, redirect } = this.props.classes;
    const { username, password, loading } = this.state;

    return (
      <Paper className={root}>
        <Avatar className={avatar}>
          {loading ? (
            <CircularProgress size={60} color="primary" thickness={4} />
          ) : (
            <PersonIcon />
          )}
        </Avatar>
        <Typography variant="headline" component="h3" align="center">
          Login
        </Typography>
        <form onSubmit={this.onSubmit}>
          <TextField
            required
            fullWidth
            label="username"
            onChange={this.onChange}
            name="username"
            placeholder="Username"
            margin="normal"
            value={username}
            error={username.length === 0 ? true : false}
          />
          <TextField
            required
            fullWidth
            type="password"
            label="password"
            onChange={this.onChange}
            name="password"
            placeholder="Password"
            margin="normal"
            value={password}
            error={password.length === 0 ? true : false}
          />
          <Button
            className={button}
            type="submit"
            variant="extendedFab"
            color="primary"
            fullWidth
            disabled={username.length === 0 || password.length === 0}
          >
            Submit
          </Button>
        </form>
        <Button
          className={redirect}
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => this.props.history.push('/register')}
        >
          Need Account?
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(login);
