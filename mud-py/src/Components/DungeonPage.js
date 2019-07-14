import React from 'react';
import ChatBox from './ChatBox';
import Dungeon from './Dungeon';
import Commands from './Commands';
import RoomInfo from './RoomInfo';
import { Container } from '@material-ui/core';

class DungeonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={{ color: 'white' }}>
        <Dungeon />
        <Commands />
        <ChatBox />
        <RoomInfo currentRoom={this.props.state.currentRoom} />
      </Container>
    );
  }
}

export default DungeonPage;
