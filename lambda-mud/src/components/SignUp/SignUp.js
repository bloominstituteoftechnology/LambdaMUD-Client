import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'https://lambda-mudism.herokuapp.com/api/registration';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password1: '',
      password2: ''
    };
  }

  onSignUpClick = e => {
    e.preventDefault();
    const request = {
      'username': this.state.username,
      'password1': this.state.password1,
      'password2': this.state.password2
    }

    if (request.password1 !== request.password2) {
      alert('Your passwords need to match.');
      return false;
    }

    axios.post(API_URL, request)
      .then(res => {
        localStorage.setItem('token', res.data.key);
        window.location.href = '/game';
      })
      .catch(e => {
        console.log(`The following error occurred: ${e}`);
        alert('Sorry, there was an error. Please try again.');
      })
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <main>
        <section className="signup">
          <h2>Sign Up</h2>
          <form>
            <label htmlFor="username">Create a username</label>
            <input className="username" type="text" id="username" name="username" placeholder="Username" onChange={e => this.onInputChange(e)} />
            
            <label htmlFor="password1">Enter a password</label>
            <input className="password1" type="password" id="password1" name="password1" placeholder="Password" onChange={e => this.onInputChange(e)} />
            
            <label htmlFor="password2">Enter your password again</label>
            <input className="password2" type="password" id="password2" name="password2" placeholder="Password (again)" onChange={e => this.onInputChange(e)} />
            
            <button className="button--submit" type="submit" onClick={e => this.onSignUpClick(e)}>Submit</button>
          </form>
        </section>
      </main>
    );
  }
};

export default SignUp;