import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: "",
      error: ""
    };
  }

  inputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value, error: "" });
  };

  //   submitHandler = e => {

  //     e.preventDefault();
  //     axios
  //       .post(
  //         "https://lambda-mud-dpok.herokuapp.com/api/registration",
  //         this.state
  //       )
  //       .then(res => {
  //         console.log("response", res);
  //         const token = res.data["key"];
  //         localStorage.setItem("token", `Token ${token}`);
  //         this.props.history.push("/adventure");
  //       })
  //       .catch(err => {
  //         console.log("Axios error:", err);
  //       });
  //   };

  submitHandler = event => {
    event.preventDefault();

    const { username, password1, password2 } = this.state;
    
    const registerUser = {
      username: username,
      password1: password1,
      password2: password2
    };

    console.log("submitHandler", registerUser)
    if (password1 === password2 && password1.length > 5) {
      axios
        .post("https://lambda-mud-dpok.herokuapp.com/api/registration", registerUser)
        .then(response => {
          console.log('response', response)
          localStorage.setItem("Token", response.data.key);
          this.setState({
            username: "",
            password1: "",
            password2: ""
          });
          this.props.history.push("/adventure");
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: "Username already taken."
          });
        });
    } else if (password1.length < 6) {
      this.setState({
        error: "Password length must be at least 6 characters long",
        password1: "",
        password2: ""
      });
    } else {
      this.setState({
        error: "Passwords do not match.",
        password1: "",
        password2: ""
      });
    }
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
            <h1>Register</h1>
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
                  value={this.state.password1}
                  onChange={this.inputChangeHandler}
                  type="password"
                  placeholder="Password"
                  name="password1"
                />
              </div>
              <div className="form-group col-md-12">
                <input
                  value={this.state.password2}
                  onChange={this.inputChangeHandler}
                  type="password"
                  placeholder="Re-enter Password"
                  name="password2"
                />
              </div>
              <button type="submit">Create User</button>
            </form>
            <div className="server-error-msg">{this.state.error}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
