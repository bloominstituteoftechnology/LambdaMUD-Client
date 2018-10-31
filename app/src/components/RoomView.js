import React, { Component } from 'react';

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
          <div className="room-title"></div>
          <div className="room-description"></div>
          <div className="room-players">
            {/* map over players list here */}
          </div>
        </div>
        <input className="room" type="text" onChange={this.onFieldChange} name="username" />
      </div>
    )
  }
}

export default RoomView;