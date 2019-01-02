import React, { Component } from 'react';

class MoveCompass extends Component {
    render () {
        return (
            <div className='move-compass'>
                <button className='north' value='n' onClick={this.props.handleMove}>North</button>
                <button className='south' value='s' onClick={this.props.handleMove}>South</button>
                <button className='east' value='e' onClick={this.props.handleMove}>East</button>
                <button className='west' value='w' onClick={this.props.handleMove}>West</button>
            </div>
        )
    }
}

export default MoveCompass;