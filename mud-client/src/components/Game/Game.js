import React from 'react';
import { Link } from 'react-router-dom';

class Game extends React.component {
    constructor() {
        super(); 
        this.state = {
            player: {
                name: '',
                title: '',
                description: '',
                uuid: ''
            }
        };
    }
    
    logout = event => {
        localStorage.clear();
    };

    render() {
        return (
            <>
            <div className="game">GAME LAND</div>
                <div>{this.state.player.name}</div>
                <div>{this.state.player.title}</div>
                <div>{this.state.player.description}</div>
                <input type="text" placeholder="Enter Command Here" />
            <div>
                <h1>Game On</h1>
                <button>West</button>
               <div><button>North</button><button>South</button></div>
            </div>
            <div>
                <div>    
                    <Link to="/">
                        <button onClick={logout}>Log Out</button>
                    </Link>
                </div>
            </div>
           </>
       )
    }
}

export default Game;
