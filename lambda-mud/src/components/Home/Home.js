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
          Home
        </section>
      </main>
    );
  }
};

export default Home;