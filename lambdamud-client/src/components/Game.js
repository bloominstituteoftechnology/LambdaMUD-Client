import React, { Component } from 'react';
import StyledGame, { StyledInput } from '../styles/game';

class Game extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.props.fetchInitInfo(token);
  }

  consoleLog = () => {
    console.log(this.props);
  };

  render() {
    return (
      <React.Fragment>
        <StyledGame>
          <p>
            {this.props.title}
            {this.props.description}
          </p>
        </StyledGame>
        <StyledInput type="text" />
        <button onClick={this.consoleLog}>Click</button>
      </React.Fragment>
    );
  }
}

export default Game;
