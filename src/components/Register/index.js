import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Button from '../Button';
import './index.css';

class Register extends Component {
  state = {
    username: "",
    pass1: "",
    pass2: "",
    error: false,
    redirect: false
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();
    let data = {
        "username": this.state.username,
        "password1": this.state.pass1,
        "password2": this.state.pass2,
    }
    axios.post("https://lambda-mud-alex.herokuapp.com/api/registration", data)
      .then(response => {
          console.log(response)
          const key = response.data["key"];
          localStorage.setItem("token", key);
          this.setState({ redirect: true });
        })
        .catch(error => {
            if(this.state.username === "" || this.state.pass1 === "" || this.state.pass2 === "") {
              this.setState({ error: true})
            }
        })
    this.setState({ username: "", pass1: "", pass2: "" });
  }
  render() {
    return(
      <div className="Register">
        <h1 className="Title">Register To Play!</h1>
        <input
          className="Input"
          type="text"
          name="username"
          placeholder=" your username"
          value={this.state.username}
          onChange={this.handleChange}
          onClick={() => this.setState({ error: false })}
        />
        <input
          className="Input"
          type="password"
          name="pass1"
          placeholder=" type password"
          value={this.state.pass1}
          onChange={this.handleChange}
          onClick={() => this.setState({ error: false })}
        />
        <input
          className="Input"
          type="password"
          name="pass2"
          placeholder=" type password again"
          value={this.state.pass2}
          onChange={this.handleChange}
          onClick={() => this.setState({ error: false })}
        />
        {this.state.error ? <p className="Error">Error creating account!</p> : null}
        <Button event={this.handleSubmit} text="Register"/>
        {this.state.redirect ? <Redirect to="/window" /> : null}
      </div>
    );
  }
}

export default Register;