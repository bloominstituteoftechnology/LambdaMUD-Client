import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = () => {
    const credentials = { username: this.state.username, password: this.state.password };

    axios
      .post('https://lambda-mud.herokuapp.com/api/login', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.key);
        localStorage.setItem("username", this.state.username);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleLogin}>
          <input type="text"
                 name="username"
                 placeholder="Username"
                 value={this.state.username}
                 onChange={this.handleInputChange} />
          <input type="password"
                 name="password"
                 placeholder="Password"
                 value={this.state.password}
                 onChange={this.handleInputChange} />
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </form>
      </div>
    );
  }
}

export default Login;
