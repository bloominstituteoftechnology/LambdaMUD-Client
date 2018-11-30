import React, { Component } from 'react';

class Game extends Component {
    render() {
        return (
        <div className='game'>
            <div className='message'></div>
            <div className='controller'>
            <button>West</button>
            <div className='column'>
                <button>North</button>
                <button>South</button>
            </div>
            <button>East</button>
            </div>
        </div>
        )
    }
}

export default Game ;