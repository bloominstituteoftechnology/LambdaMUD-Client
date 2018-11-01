import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: ""
    };
  }

  onInputChangeHandler = event => {
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

  onSubmitHandler = event => {
    const { username, password } = this.state;

    const userRegistration = {
      username,
      password
    };

    event.preventDefault();

    axios
      .post("https://katia-lambda-mud.herokuapp.com/api/login", userRegistration)
      .then(response => {
        localStorage.setItem("token", response.data.key);
        this.setState({
          username: "",
          password: ""
        });
        this.props.history.push("/adventure");
      })
      .catch(err => {
        this.setState({
          error: "Either username or password incorrect. Please try again",
          username: "",
          password: ""
        });
      });
  };

  render() {
    return (
      <div className="registration container">
        <h1>Login</h1>
        <form onSubmit={this.onSubmitHandler}>
          <div className="row">
            <div className="form-group col-md-12">
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.onInputChangeHandler}
              />
            </div>
            <div className="form-group col-md-12">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onInputChangeHandler}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              {" "}
              Let's Go{" "}
            </button>
          </div>
        </form>
        <div className="error">{this.state.error}</div>
        <div className="register-relocation">
          <p> Don't have an account?</p>
          <Link to="/registration">Sign up Here</Link>
        </div>
      </div>
    );
  }
}

export default Login;
