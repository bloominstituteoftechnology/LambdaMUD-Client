import React, { Component } from 'react';

import axios from 'axios'
import hkurl from '../../helpers/scripts'
import {Link} from 'react-router-dom'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Card, CardContent, CardHeader, Typography} from '@material-ui/core/';


class Home extends Component {
  constructor(){
    super()
    this.state = {
      room : {
        name: ''
      }
    }
  }

  componentDidMount = () => {
    //make axios call to get player's room

    //update default room to player's current room

    //Upon login, subscribe to a Pusher channel based on the player's universally unique id: p-channel-<uuid>
  
    //Bind the player channel to broadcast events and display the messages to the player
    
  };

  tryCommand = (command) => {

  }

  parseResponse = (response) => {

  }

  say(){

  }

  render() {
    return (
      <div className="Home">
      <Typography variant="headline">Current Room: {this.state.room.name}</Typography>
      </div>
    );
  }
}

export default Home;
