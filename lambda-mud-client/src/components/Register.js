import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  };

  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .post(
        "https://lambda-mud-dpok.herokuapp.com/api/registration",
        this.state
      )
      .then(res => {
        console.log("response", res);
        const token = res.data["key"];
        localStorage.setItem("token", `Token ${token}`);
        this.props.history.push("/adventure");
      })
      .catch(err => {
        console.log("Axios error:", err);
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
            <form className="register-form" onSubmit={this.submidHandler}>
              <input
                value={this.state.username}
                onChange={this.inputChangeHandler}
                type="text"
                placeholder="Username"
                name="username"
              />
              <input
                value={this.state.password1}
                onChange={this.inputChangeHandler}
                type="password"
                placeholder="Password"
                name="password1"
              />
              <input
                value={this.state.password2}
                onChange={this.inputChangeHandler}
                type="password"
                placeholder="Re-enter Password"
                name="password2"
              />
              <button type="submit">Create User</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;