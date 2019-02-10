import React, { Component } from "react";
import {Link} from "react-router-dom";
import Axios from "axios";
const secret = "oogaboogabooga"
const host = "https://stefarg-lambdamud.herokuapp.com";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = (e) => {
    e.preventDefault();
    Axios.post(`${host}/api/login`, this.state).then(
      function(response) {
        localStorage.setItem('Auth',`Token ${response.data.key}`);
      },
      this.setState({
        username: "",
        password: ""
      }),
      console.log(this.props.history.location.pathname)
    )
    .catch(function(error) {
      alert(error.response.data.error);
    });
  };

  render() {
    return (
      <div>
      <form onSubmit={(e) => (this.login(e), this.props.history.push("/adv/"))}>
        <input
          onChange={this.handleInputChange}
          placeholder="username"
          value={this.state.username}
          name="username"
        />
        <input
          onChange={this.handleInputChange}
          placeholder="Password"
          value={this.state.password}
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/registration">
          <button type="button">Register</button>
        </Link>
      </div>
    );
  }
}

export default Login;
