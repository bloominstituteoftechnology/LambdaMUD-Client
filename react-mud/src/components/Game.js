import React, { Component } from 'react';
import axios from 'axios';

class Game extends Component {
    constructor() {
        super();
        this.state = { 
            messageBoard: [],
            gameInput: ''
        }
    }
    render() {
        return(
            <div className="game">
                <h1>GAME</h1>
                <div className="game-message-board"></div>
                <div className="game-input-wrapper">
                    <form action="" className="game-form">
                        <input 
                            type="text" 
                            className="game-input-field"
                            placeholder="Enter Command..."
                            name="gameInput"
                            value={this.state.gameInput}
                            onChange={this.handleGameInputChange}
                        />
                        <button className="game-input-button" onSubmit={this.handleGameInputSubmit}>Send</button>
                    </form>
                </div>
            </div>
        )
    }
    handleGameInputChange = (e) => {
        this.setState({ gameInput: e.target.value })
    }
    handleGameInputSubmit = (e) => {
        e.preventDefault();

    }
}
export default Game;