import React, { Component } from 'react';
import './components.css';

class UserInfo extends Component {

logout = () => {
  sessionStorage.clear();
  window.location.reload();
}
instructions = () => {
  alert('Enter a valid direction (N, S, E, W) to move around in the game. To send a message to the room, type "say" before your message.')
}

    render() {

      
        return (
            <div className='user-info'>
               <p className='display-player-text'>Welcome, <span className='display-user-text'>{this.props.user.username}!</span></p>
                <button onClick={this.instructions} className='instructions-button'>Instructions</button>
                <button onClick={this.logout} className='logout-button'>Quit Game</button>
            </div>
        );
    }
}

export default UserInfo;
