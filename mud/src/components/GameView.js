import React from 'react';
import './GameView.css';


class GameView extends React.Component {
    constructor(props){
        super()
    }

    render(){
        return(
            <div className = "main-wrapper">
                <div className="main-header">
                    <h3>Adventure</h3>
                </div>
                <div className="info-wrapper">
                    <div className="info1">
                        <p className="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                    <hr/>
                    <div className="info2">
                        <p className="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>
                <div className="input-wrapper">
                    <input placeholder="Type a Command" />
                    <button className="game-button">Send</button>
                </div>   
            </div>
        );
    }
}

export default GameView;