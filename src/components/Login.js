import React from "react";
import axios from "axios";
import "./Login.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      register: false
    };
  }
  componentDidMount() {}

  toggleRegister = event => {
    event.preventDefault();
    this.setState({ register: !this.state.register });
  };

  inputInfo = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitRegister = event => {
    event.preventDefault();
    const registerUser = {
      username: this.state.username,
      password1: this.state.password,
      password2: this.state.password2
    };
    axios
      .post("https://nicky-adventuregame.herokuapp.com/api/registration", registerUser)
      .then(response => {
        alert("Account created, you will now be routed to the Login Page");
        this.setState({ register: !this.state.register });
      })
      .catch(err => {
        alert(err.message);
      });
  };
  submitLogin = event => {
    event.preventDefault();
    const loginUser = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("https://nicky-adventuregame.herokuapp.com/api/login", loginUser)
      .then(response => {
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("password", this.state.password1);
        localStorage.setItem("token", JSON.stringify(response.data.key));
        this.setState({ username: "", password1: "" });
        window.location.reload();
      })
      .catch(err => {
        this.setState({ username: "", password1: "" });
        alert("Invalid Login credentials");
      });
  };

  render() {
    return (
      <div>
        {this.state.register ? (
          <form className="login-page">
            <div className="login-card">
              <h1 className="registerh1">Create Account</h1>
              <input
                className="register-input"
                name="username"
                onChange={this.inputInfo}
                type="text"
                value={this.state.username}
                placeholder="Username or email"
              />
              <input
                className="register-input"
                name="password"
                onChange={this.inputInfo}
                type="password"
                value={this.state.password}
                placeholder="Password"
              />
              <input
                className="register-input"
                name="password2"
                onChange={this.inputInfo}
                type="password"
                value={this.state.password2}
                placeholder="Password Again"
              />
              <button className="registerButton" onClick={this.submitRegister}>
                Register
              </button>
              <p>
                Already have an account?{" "}
                <span className="register" onClick={this.toggleRegister}>
                  Login Here
                </span>
              </p>
            </div>
          </form>
        ) : (
          <form className="login-page">
            <div className="login-card">
              <h1>Lambda MUD</h1>
              <input
                name="username"
                onChange={this.inputInfo}
                type="text"
                value={this.state.username}
                placeholder="Username"
              />
              <input
                name="password"
                onChange={this.inputInfo}
                type="password"
                value={this.state.password}
                placeholder="Password"
              />
              <button onClick={this.submitLogin}>Login Here</button>
              <p>
                No Account yet?{" "}
                <span className="register" onClick={this.toggleRegister}>
                  Register here.
                </span>
              </p>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
