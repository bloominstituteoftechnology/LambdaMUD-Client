import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  }
  componentDidMount() {
    localStorage.setItem("savedPage", "/signup");
  }
  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmitHandler = e => {
    e.preventDefault();
    if (this.state.username.length < 4) {
      alert("Username must be at least 4 characters long.");
    } else if (this.state.password1.length < 6) {
      alert("Password must be at least 6 characters long.");
    } else if (this.state.password1 !== this.state.password2) {
      alert("Passwords do not match.");
    } else {
      const newUserObj = {
        username: this.state.username,
        password1: this.state.password1,
        password2: this.state.password2
      };
      axios
        .post(
          "https://mud-project1.herokuapp.com/api/registration/",
          newUserObj
        )
        .then(res => {
          localStorage.setItem("token", res.data.key);
          this.props.history.push("/main");
        })
        .catch(err => alert("The password is either already taken or too short, please try another password."));
    }
  };
  redirect = () => {
    this.props.history.push("/login");
  };
  render() {
    return (
      <div onSubmit={this.onSubmitHandler}>
        <h2>Sign up for the Quest of your life!</h2>
        <input
          onChange={this.onChangeHandler}
          type="text"
          name="username"
          value={this.state.username}
          placeholder="Enter username."
        />
        <input
          onChange={this.onChangeHandler}
          type="password"
          name="password1"
          value={this.state.password}
          placeholder="Enter password."
        />
        <input
          onChange={this.onChangeHandler}
          type="password"
          name="password2"
          value={this.state.password}
          placeholder="Enter password again."
        />
        <button type="submit" onClick={this.onSubmitHandler}>Make New Warrior</button>
        <button type="button" onClick={this.redirect}>
          Already Have An Account? Don't worry, let's play again!
        </button>
      </div>
    );
  }
}
export default withRouter(RegisterForm);