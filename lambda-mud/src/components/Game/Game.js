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
          <h2>LambdaMUD</h2>
          <div className="viewer"></div>
          <div className="input-area">
            <input className="input-area__field" type="text" placeholder="Type your command here" />
            <button className="input-area__button">Enter</button>
          </div>
        </section>
      </main>
    );
  }
};

export default Game;