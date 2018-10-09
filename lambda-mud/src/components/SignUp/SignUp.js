import React, { Component } from 'react';
import axios from 'axios';

const API_URL = '';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      temp: []
    };
  }

  render() {
    return (
      <main>
        <section className="signup">
          <h2>Sign Up</h2>
          <form>
            <label htmlFor="username">Create a username</label>
            <input className="username" type="text" id="username" name="username" placeholder="Username" />
            
            <label htmlFor="password1">Enter a password</label>
            <input className="password1" type="password" id="password1" name="password1" placeholder="Password" />
            
            <label htmlFor="password2">Enter your password again</label>
            <input className="password2" type="password" id="password2" name="password2" placeholder="Password (again)" />
            
            <button className="button--submit" type="submit">Submit</button>
          </form>
        </section>
      </main>
    );
  }
};

export default SignUp;