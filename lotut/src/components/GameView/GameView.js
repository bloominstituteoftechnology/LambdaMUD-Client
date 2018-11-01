import React, { Component } from 'react';
import '../Registration/index.css';
// import { Link } from 'react-router-dom';




class GameView extends Component {
    
    render() {
        return (
            <form className="regForm">
                <div className="regOverlay">
                    <div className="mainScreen">
                        Main Screen
                        <div className="textOutput">
                            Text output
                        </div>
                        <div className="userInput">
                        User input
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}




export default GameView;