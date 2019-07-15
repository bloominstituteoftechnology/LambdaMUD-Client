import React from 'react';
import axios from 'axios';
import ChatBox from './ChatBox';
import Dungeon from './Dungeon';
import Commands from './Commands';
import RoomInfo from './RoomInfo';
import { Container } from '@material-ui/core';

class DungeonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true
    };
  }

  getRoomInfo = () => {
      axios
        .get('https://lambda-mud-test.herokuapp.com/api/adv/init/', this.props.content)
        .then(data => {
          this.setState({ currentRoom: data.data, refresh: false });
        })
        .catch(err => {
          console.log(err);
        });
  }

  render() {
    return (
      <Container style={{ color: 'white' }}>
        <Dungeon />
        <Commands />
        <ChatBox />
        <RoomInfo currentRoom={this.state.currentRoom} getRoomInfo={this.getRoomInfo} />
      </Container>
    )
  }
}

export default DungeonPage;
