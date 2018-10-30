import React, { Component } from 'react';
import Pusher from 'pusher-js';
import StyledGame, { StyledInput } from '../styles/game';

class Game extends Component {
  state = {
    chats: [],
    test: ''
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    await this.props.fetchInitInfo(token);
    const pusher = new Pusher('f5f1c81452944005d664', {
      cluster: 'us2',
      encrypted: true
    });
    // const channel = pusher.subscribe(`p-channel-${this.props.uuid}`);
    console.log(this.props.uuid);
    const channel = pusher.subscribe(
      'p-channel-91ab7f6d-2ecb-4f92-be9a-f30f36b5cde9'
    );
    channel.bind('broadcast', data => this.props.fetchNewMessage(data.message));
    console.log(channel);
  }

  render() {
    console.log(this.props.data);
    console.log(this.state.chats);
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
