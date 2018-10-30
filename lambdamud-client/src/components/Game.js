import React, { Component } from 'react';
import Pusher from 'pusher-js';
import StyledGame, { StyledInput } from '../styles/game';

class Game extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.props.fetchInitInfo(token);
  }

  componentDidUpdate(prevProps) {
    if (this.props.uuid !== prevProps.uuid) {
      const pusher = new Pusher('f5f1c81452944005d664', {
        cluster: 'us2',
        encrypted: true
      });
      const channel = pusher.subscribe(`p-channel-${this.props.uuid}`);
      channel.bind('broadcast', data =>
        this.props.fetchNewMessage(data.message)
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <StyledGame>
          <h3>Hello, {this.props.name}</h3>
          {this.props.data.map((message, index) => {
            return (
              <div key={index}>
                <p>{message}</p>
              </div>
            );
          })}
        </StyledGame>
        {/* setup onsubmit, which decides what to do */}
        <form>
          <StyledInput type="text" />
        </form>
      </React.Fragment>
    );
  }
}

export default Game;
