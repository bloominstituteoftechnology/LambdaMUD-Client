import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import MudForm from './MudForm';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
    };
  }

  render() {
    const { name, title, description, players, pusherInfo } = this.props;
    // don't show currently logged in player
    const notCurrentPlayer = players.filter(p => p !== name);
    let playersInRoom = '';
    if (notCurrentPlayer.length > 1) {
      notCurrentPlayer.forEach(p => (playersInRoom += p + ', '));
      playersInRoom = playersInRoom.slice(0, -2) + ' are standing there.';
    }
    if (notCurrentPlayer.length === 1) {
      playersInRoom = notCurrentPlayer + ' is standing there.';
    }
    return (
      <Card
        style={{
          height: '400px',
          background: 'darkgrey',
        }}
      >
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>
            {description}
            <br />
            <br />
            {playersInRoom ? playersInRoom : null}
            <br />
            {pusherInfo}
          </CardText>
        </CardBody>
        <MudForm
          style={{ width: '100%', position: 'absolute', right: '0' }}
          moveCharacter={this.props.doMove}
          sayCharacter={this.props.doSay}
        />
      </Card>
    );
  }
}

export default Room;
