import React, { Component } from "react";
import axios from "axios";
import { Input, Button, Grid, CenterForm, MainForm } from "../global-styles/Global";
import {PageHeading, Emoji} from '../global-styles/Section'

const url = "https://dungeon-pusher-app.herokuapp.com/api/login/";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLogin = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post(url, user).then(response => {
      console.log(response);
      localStorage.setItem("token", response.data.key);
      this.props.history.push('/play');
    });

    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    return (
    <CenterForm>
        <form>
          <Grid>
          <Emoji>👾 </Emoji>
          <PageHeading>Login to play</PageHeading>
            <Input
              value={this.state.username}
              placeholder="username"
              onChange={this.handleChange}
              name="username"
              autoComplete="off"
            />
            <Input
              value={this.state.password}
              placeholder="password"
              onChange={this.handleChange}
              name="password"
              type="password"
            />
            <Button onClick={this.handleLogin}>Login</Button>
          </Grid>
        </form>
    </CenterForm>
    );
  }
}

export default Login;
