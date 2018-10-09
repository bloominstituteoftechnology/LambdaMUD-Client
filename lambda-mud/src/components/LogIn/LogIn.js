import React, { Component } from 'react';
import axios from 'axios';

const API_URL = '';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      temp: []
    };
  }

  render() {
    return (
      <main>
        <section className="login">
          <h2>Log In</h2>
          <form>
            <label for="username">username</label>
            <input className="username" type="text" id="username" name="username" />
            
            <label for="password">password</label>
            <input className="password" type="password" id="password" name="password" />
            
            <button className="button--submit" type="submit">Submit</button>
          </form>
        </section>
      </main>
    );
  }
};

export default LogIn;