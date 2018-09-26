import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import styled from 'styled-components';
import MudForm from './MudForm';

const Div = styled('div')`
  text-align: center;
`;

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
    };
  }

  render() {
    const { uuid, name, title, description, players } = this.props;
    let playersInRoom = '';
    if (players.length > 1) {
      players.forEach(p => (playersInRoom += p + ', '));
      playersInRoom = playersInRoom.slice(0, -3) + ' are standing there.';
    }
    if (players.length == 1) {
      playersInRoom = players + ' is standing there.';
    }
    return (
      <Div>
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
            </CardText>
          </CardBody>
          <MudForm
            style={{ width: '100%', position: 'absolute', right: '0' }}
            moveCharacter={this.props.doMove}
          />
        </Card>
      </Div>
    );
  }
}

export default Room;
