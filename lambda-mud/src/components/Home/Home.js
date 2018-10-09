import React, { Component } from 'react';
import axios from 'axios';

const API_URL = '';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      temp: []
    };
  }

  render() {
    return (
      <main>
        <section className="home">
          <h1>Welcome to Lambda MUD</h1>
          <div className="home__links">
            <a href="/login" className="home-login">Log In</a>
            <a href="/signup" className="home-signup">Sign Up</a>
          </div>
        </section>
      </main>
    );
  }
};

export default Home;