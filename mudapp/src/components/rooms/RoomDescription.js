import React, { Component } from 'react'

import { DescriptionSection, RoomLocation, Description, BrickWall } from './RoomStyles';


class RoomDescription extends Component {

  render() {
    console.log('AT ROOM', this.props)
    return (
      <DescriptionSection className={`${this.props.roomTheme}`}>
        <RoomLocation>
          <h1>Location</h1>
          <h2>{this.props.roomTitle}</h2>
        </RoomLocation>

        <Description>
          <h1>Description</h1>
          <h3>{this.props.roomDescription}</h3>
        </Description>

        <BrickWall>
          {this.props.canWalk ?
            null
            :
            <h3>You hit a dead end!</h3>
          }
        </BrickWall>
      </DescriptionSection>
    )
  }
}

export default RoomDescription;
