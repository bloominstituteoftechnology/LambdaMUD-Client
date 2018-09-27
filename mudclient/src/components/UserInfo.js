import React, { Component } from 'react';
import './components.css';

class UserInfo extends Component {
    render() {
        return (
            <div className='user-info'>
               <p className='display-player-text'>{this.props.user.username}</p> 
            </div>
        );
    }
}

export default UserInfo;
