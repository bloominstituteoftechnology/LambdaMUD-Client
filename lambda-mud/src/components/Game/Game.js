import React, { Component } from 'react';
import axios from 'axios';

const API_URL = '';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      temp: []
    };
  }

  render() {
    return (
      <main>
        <section className="game">
          Game
        </section>
      </main>
    );
  }
};

export default Game;