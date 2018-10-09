import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import axios from "axios";

import "./CreateAccount.css";

class CreateAccount extends Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/registration/", this.state, {
        headers: { "Content-Type": "application/json" }
      })
      .then(response => {
        const token = response.data.key;
        localStorage.setItem("jwt", JSON.stringify(token));
        window.location.reload();
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <Form inline className="CreateAccount" onSubmit={this.handleSubmit}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="username" className="mr-sm-2">
              Username
            </Label>
            <Input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
              placeholder="user"
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="password" className="mr-sm-2">
              Password
            </Label>
            <Input
              name="password1"
              value={this.state.password1}
              onChange={this.handleChange}
              type="password"
              placeholder="pass"
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="password" className="mr-sm-2">
              Password
            </Label>
            <Input
              name="password2"
              value={this.state.password2}
              onChange={this.handleChange}
              type="password"
              placeholder="confirm"
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Sign Up</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default CreateAccount;
