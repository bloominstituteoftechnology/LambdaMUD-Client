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
          Log In
        </section>
      </main>
    );
  }
};

export default LogIn;