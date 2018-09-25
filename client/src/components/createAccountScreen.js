import React, { Component } from 'react';
import '../styles/createAccountScreen.css';
import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password1: '',
      password2: ''
    };
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.password1 !== '' && (this.state.password1 === this.state.password2)) {
      const user = {
        username: this.state.username,
        password1: this.state.password1,
        password2: this.state.password2
      };

      axios.post(`${URL}/registration/`, user)
        .then((res) => {
          console.log(res);
          this.setState({
            username: '',
            password1: '',
            password2: ''
          });
        }).catch((err) => console.log(err));
    }  
  }

  render() {
    return (
      <div className="Register-Form">
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInput} 
          />
          <input
            placeholder="password"
            name="password1"
            type="password"
            value={this.state.password1}
            onChange={this.handleInput} 
          />
          <input
            placeholder="confirm password"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.handleInput} 
          />
          <button type="submit">Connect</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
