import React, { Component } from "react";
import axios from "axios";
import { Input, Button, Grid } from "../global-styles/Global";
import {PageHeading} from '../global-styles/Section'

const url = "https://dungeon-pusher-app.herokuapp.com/api/registration/";

class Register extends Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleRegister = async event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2
    };
    try {
      const response = await axios.post(url, user);
      console.log(response);
      localStorage.setItem("token", response.data.key);
    } catch (event) {
      console.log(event);
    }
    this.setState({
      username: "",
      password1: "",
      password2: ""
    });
  };

  render() {
    return (
      <div className="App">
        <form>
          <Grid>
          <PageHeading>👾 Register to play 👾 </PageHeading>
            <Input
              value={this.state.username}
              placeholder="username"
              onChange={this.handleChange}
              name="username"
              autoComplete="off"
            />
            <Input
              value={this.state.password1}
              placeholder="password"
              onChange={this.handleChange}
              name="password1"
              type="password"
            />
            <Input
              value={this.state.password2}
              placeholder="confirm password"
              onChange={this.handleChange}
              name="password2"
              type="password"
            />
            <Button onClick={this.handleRegister}>Register</Button>
          </Grid>
        </form>
      </div>
    );
  }
}

export default Register;
