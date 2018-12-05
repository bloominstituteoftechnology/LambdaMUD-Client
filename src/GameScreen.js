import React from 'react';
import gameScreen from './dungeonGenesis.png';

export default class GameScreen extends React.Component {
    state = {
        title: '',
        description: '',
        players: [],
        name: '',
        messages: [],
        currentRoomId: '',
        uuid: ''
    }

    render() {
        
        return (
        <div>
          <div>Hello?</div>
          <input placeholder="Say something"/>
          <div>
              <button>Go North</button>
              <button>Go South</button>
              <button>Go West</button>
              <button>Go East</button>
          </div>

        </div>
        )
    }
}