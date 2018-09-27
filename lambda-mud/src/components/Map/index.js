import React from 'react'
import { connect } from 'react-redux'
import './styles.css'
import {SPRITE_SIZE} from '../../config/constants'
import Player from '../Player'

const Map = (props) => {
    return (
      <div
        style={{
          position: 'relative',
          top: '0px',
          left: '0px',
          width: '55%',
          height: '400px',
          border: '4px solid white',
          display: 'inline-block',
          color: 'white',
          marginRight: '1%',
          background: 'sienna'
        }}>
        {
          props.tiles.map( row => <MapRow tiles={row} /> )
        }
        <Player />
      </div>
    )
  }

  const getTileSprite = (type) => {
    switch(type) {
      case 0:
        return 'grass'
      case 3:
        return 'tree'
      case 4:
        return 'chest'
      case 5:
        return 'rock'
      case 6:
        return 'tree'
      case 7:
        return 'npc'
      case 8:
        return 'water'
      case 9:
        return 'light'
      default:
        console.log('GET TILE SPRITE NOT GOTTEN')
    }
  }

  const MapTile = (props) => {
    return <div 
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE
      }}
      />
  }

  const MapRow = (props) => {
    return <div
      className="row"
      style={{
        height: SPRITE_SIZE
      }}
      >{
        props.tiles.map( tile => <MapTile tile={tile} />)
      }
      </div>
  }

  const mapStateToProps = (state) => {
    return {
      tiles: state.map.tiles
    }
  }

export default connect(mapStateToProps)(Map)