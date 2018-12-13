import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }
  componentDidMount() {
    localStorage.setItem("savedPage", "/login");
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  onSubmitHandler = e => {
    // e.preventDefault();
    const userObj = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("https://mud-project1.herokuapp.com/api/login/", userObj)
      .then(res => {
        localStorage.setItem("token", res.data.key);
        // this.props.history.push("/main");
      })
      .catch(err => console.log(err.response)
        // alert("Username and password do not match.")
        );
      
  };

  redirect = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <div onSubmit={this.onSubmitHandler}>

        <h2>Log In to your quest!</h2>

        <input
          onChange={this.onChangeHandler}
          type="text"
          name="username"
          value={this.state.username}
          placeholder="Enter username."/>

        <input
          onChange={this.onChangeHandler}
          type="password"
          name="password"
          value={this.state.password}
          placeholder="Enter password."/>

        <button type="submit" onClick={this.onSubmitHandler}>Log in to begin quest!</button>
        <button type="button" onClick={this.redirect}>
          No account means no adventure! please make one for gameplay!
        </button>
      </div>
    );
  }
}
export default withRouter(LoginForm);
