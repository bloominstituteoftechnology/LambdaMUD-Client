import React, { Component } from 'react';
import '../styles/userDisplay.css';
import Outside from '../styles/images/r_outside.jpg';
import Foyer from '../styles/images/r_foyer.jpg';
import Overlook from '../styles/images/r_overlook.jpg';
import Narrow from '../styles/images/r_narrow.jpg';
import Treasure from '../styles/images/r_treasure.jpg';

class UserDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgrounds : [
        Outside,
        Foyer,
        Overlook,
        Narrow,
        Treasure
      ],
      background: null 
    };
  }

  handleBackground = () => {
    if (this.props.room.title === 'Outside Cave Entrance') {
      return this.state.backgrounds[0]; 
    } else if (this.props.room.title === 'Foyer') {
      return this.state.backgrounds[1]; 
    } else if (this.props.room.title === 'Grand Overlook') {
      return this.state.backgrounds[2]; 
    } else if (this.props.room.title === 'Narrow Passage') {
      return this.state.backgrounds[3]; 
    } else if (this.props.room.title === 'Treasure Chamber') {
      return this.state.backgrounds[4]; 
    }
      
  };

  render() {
    return (
      <div className="User-Display">
        <div>{this.props.room.title}</div>
        <div>{this.props.room.description}</div>
        <div><img src={this.handleBackground()} /></div>
      </div>
    );
  }
}

export default UserDisplay;
