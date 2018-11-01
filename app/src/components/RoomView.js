import React, { Component } from 'react';
import '../styles/RoomViewStyles.css';

class RoomView extends Component {
  state ={
    
  }

  onFieldChange = (e) => {
    // save input to moveInput
  }
  render(){
    return (
      <div className="room-view-container">
        <div className="room-info-container">
          <div className="room-title">
          <br />
            {/* room title */}
            Room: West Wing<br /><br />
          </div>
          <div className="room-description">
            {/* room description */}
            Description: Smells like sulfur because a demon is in the Oval Office.
          </div>
          <div className="room-players">
            {/* map over players list here */}
          </div>
        </div>
        <input className="room-input" placeholder="Enter move command..." onChange={this.onFieldChange} name="command" />
        <div className="cmd-options">Command options: n, s, e, w</div>
      </div>
    )
  }
}

export default RoomView;