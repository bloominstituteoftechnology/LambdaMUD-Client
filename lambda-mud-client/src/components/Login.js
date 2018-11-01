import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  inputChangeHandler = event => {
    if (this.state.error) {
      this.setState({
        [event.target.name]: event.target.value,
        error: ""
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  submitHandler = event => {
    event.preventDefault();
    console.log("state", this.state);
    axios
      .post("https://lambda-mud-dpok.herokuapp.com/api/login", this.state)
      .then(response => {
        console.log('response', response);
        localStorage.setItem("Token", response.data.key);
        this.setState({
          username: "",
          password: ""
        });
        this.props.history.push("/adventure");
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: "Username or Password incorrect",
          username: "",
          password: ""
        });
      });
  };

  render() {
    return (
      <div className="registration-page">
        <div className="outer-container">
          <div className="nav-buttons">
          </div>
          <div className="inner-container">
            <h1>Login</h1>
            <form className="register-form" onSubmit={this.submitHandler}>
              <div className="form-group col-md-12">
                <input
                  value={this.state.username}
                  onChange={this.inputChangeHandler}
                  type="text"
                  placeholder="Username"
                  name="username"
                />
              </div>
              <div className="form-group col-md-12">
                <input
                  value={this.state.password}
                  onChange={this.inputChangeHandler}
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <button type="submit">Put me in, coach</button>
            </form>
            <div className="server-error-msg">{this.state.error}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
