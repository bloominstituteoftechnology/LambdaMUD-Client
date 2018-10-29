import React, { Component } from 'react';
import StyledGame, { StyledInput } from '../styles/game';

class Game extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.props.fetchInitInfo(token);
  }

  render() {
    console.log(this.props.data);
    return (
      <React.Fragment>
        <StyledGame>
          <h3>Hello, {this.props.name}</h3>
          {this.props.data.map((move, index) => (
            <div key={index}>
              <p>Room: {move.title}</p>
              <p>{move.description}</p>
              <p>Other players: {move.players}</p>
            </div>
          ))}
        </StyledGame>
        <form>
          <StyledInput type="text" />
        </form>
      </React.Fragment>
    );
  }
}

export default Game;
