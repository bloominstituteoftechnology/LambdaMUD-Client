import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Register extends React.Component {
  state = {
    username: "",
    password1: "",
    password2: ""
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  register = () => {
    // localStorage.setItem("username", this.state.username);
    // localStorage.setItem("password", this.state.password);
    // window.location.reload();
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.login}>
          <input type="text"
                 name="username"
                 placeholder="Username"
                 value={this.state.username}
                 onChange={this.handleInputChange} />
          <input type="password"
                 name="password1"
                 placeholder="Password"
                 value={this.state.password1}
                 onChange={this.handleInputChange} />
          <input type="password"
                 name="password2"
                 placeholder="Re-type password"
                 value={this.state.password2}
                 onChange={this.handleInputChange} />
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </form>
      </div>
    );
  }
}

export default Register;
