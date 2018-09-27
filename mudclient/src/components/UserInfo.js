import React, { Component } from 'react';
import './components.css';

class UserInfo extends Component {

logout = () => {
  sessionStorage.clear();
  window.location.reload();
}

    render() {
        return (
            <div className='user-info'>
               <p className='display-player-text'>Welcome, <span className='display-current-room-title'>{this.props.user.username}!</span></p>
                <button onClick={this.logout} className='logout-button'>Quit Game</button> 
            </div>
        );
    }
}

export default UserInfo;
