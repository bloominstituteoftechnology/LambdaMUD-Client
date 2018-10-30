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

  SubmitHandler = event => {
    const { username, password } = this.state;

    event.preventDefault();

    axios
      .post("https://lambda-mud-dpok.herokuapp.com/api/login", this.state)
      .then(response => {
        localStorage.setItem("Token:", response.data.key);
        this.setState({
          username: "",
          password: ""
        });
        //   this.props.history.push("/adventure");
      })
      .catch(err => {
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
            <Link to={"/login"}>Login</Link>
            <Link to={"/registation"}>Register</Link>
          </div>
          <div className="inner-container">
            <h1>Login</h1>
            <form className="register-form" onSubmit={this.submidHandler}>
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
