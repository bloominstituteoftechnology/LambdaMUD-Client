import React, { Component } from 'react';

class Game extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
    this.setState({ });
  }

  render() {
    return (
      <div className="game">
        <h2>Display</h2>
        <p>The latest Rift update added a lot of content. Mentoring, Conquest, new Instant Adventures, and Summerfest.</p> 
        <p>For instance, SWTOR has over 200,000 lines of spoken dialogue, as verified by Guinness World Records.</p> 
        <p>That meant ditching my Sentinel soul, scaling back on my Shaman talents, and weaving in a very strong dose of Justicar.</p>
        <input
          type="text"
          placeholder="Enter a command"
          name="input"
        />
        <button>Send</button>
      </div>
    );
  }
}

export default Game;
