import React from "react";
import axios from "axios";

const url = "https://lambdamudvleon.herokuapp.com/api/login/";

// login supplies another token and validates the user in the backend by submitting a post request. Once the user is validated the the url is pushed to the route of the game

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      Token: ""
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
    axios
      .post(url, loginInfo)
      .then(response => {
        console.log("success");
        localStorage.setItem("Token", response.data.key);
        this.props.history.push(`/game`);
      })
      .catch(err => console.log("Error: ", err));
  };

  render() {
    return (
      <div className="login-container">
        <h4>Login In</h4>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={this.state.username}
          onChange={this.onChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}
        />
        <button className="login-btn" onClick={this.loginUser}>
          LOGIN
        </button>
      </div>
    );
  }
}

export default Login;
