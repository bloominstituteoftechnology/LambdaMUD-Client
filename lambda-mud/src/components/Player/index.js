import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './pink_char.png'
import handleMovement from './movement'

const Player = (props) => {
    return(
        <div
        style={{
            position: 'absolute',
            top: props.position[1],
            left: props.position[0],
            backgroundImage: `url('${walkSprite}')`,
            backgroundPosition: props.spriteLocation,
            width: '40px',
            height: '40px',
        }} 
    />
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.character
    }
}

export default connect(mapStateToProps)(handleMovement(Player))