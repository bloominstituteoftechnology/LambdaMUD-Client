import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  loginUser = event => {
    event.preventDefault();
    const loginInfo = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post(url, loginInfo).then(response => {
      this.setState({});
    });
  };

  render() {
    return (
      <div className="login-container">
        <h4>Login In</h4>
        <input
          type="text"
          placeholder="username"
          value={this.state.username}
          onchange={this.onChange}
        />
        <input
          type="password"
          placeholder="password"
          value={this.state.password}
          onchange={this.onChange}
        />
        <div className="login-btn">LOGIN</div>
      </div>
    );
  }
}

export default Login;
