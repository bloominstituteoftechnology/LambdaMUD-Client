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
          Sign Up
        </section>
      </main>
    );
  }
};

export default SignUp;