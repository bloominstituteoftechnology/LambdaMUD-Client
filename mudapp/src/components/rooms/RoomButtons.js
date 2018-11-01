import React, { Component } from 'react'
import RoomPlayers from './RoomPlayers';

import { ButtonPlayersSection, ButtonSection } from './RoomStyles';



class RoomButtons extends Component {
  render() {
    return (
      <ButtonPlayersSection className={`${this.props.roomTheme}`}>
        <h1>Direction</h1>
        <ButtonSection>
          <div>
            <button onClick={() => this.props.movePlayer('n')}>North</button>
          </div>
          <div>
            <button onClick={() => this.props.movePlayer('w')}>West</button>
            <button onClick={() => this.props.movePlayer('e')}>East</button>
          </div>
          <div>
            <button onClick={() => this.props.movePlayer('s')}>South</button>
          </div>
        </ButtonSection>
        <RoomPlayers
          movementByOthers={this.props.movementByOthers}
          playersInRoom={this.props.playersInRoom}
        />
      </ButtonPlayersSection>
    )
  }
}

export default RoomButtons;
