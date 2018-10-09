import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'https://lambda-mudism.herokuapp.com/api/login';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.setState({
      username: '',
      password: ''
    })
  }

  onLoginClick(e) {
    e.preventDefault();
    console.log('yes');
    const request = {
      "username": this.state.username,
      "password": this.state.password,
    }

    console.log(request);

    axios.post(API_URL, request)
      .then(res => {
        localStorage.setItem('token', res.data.key);
        console.log(localStorage.getItem('mudToken'))
        window.location.href = '/game';
      })
      .catch(e => {
        console.log(`The following error occurred: ${e}`);
        alert('Please try again.');
      })
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <main>
        <section className="login">
          <h2>Log In</h2>
          <form>
            <label htmlFor="username">username</label>
            <input className="username" type="text" id="username" name="username" onChange={e => this.onInputChange(e)} />
            
            <label htmlFor="password">password</label>
            <input className="password" type="password" id="password" name="password" onChange={e => this.onInputChange(e)} />
            
            <button className="button--submit" type="submit" onClick={e => this.onLoginClick(e)}>Submit</button>
          </form>
        </section>
      </main>
    );
  }
};

export default LogIn;