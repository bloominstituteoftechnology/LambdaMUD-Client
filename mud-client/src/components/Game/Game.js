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
                uuid: '',
                players: []
            }
        };
    }
    
    logout = event => {
        localStorage.clear();
    };

    render() {
        return (
            <>
                <div className="game">
                    <h1>GAME LAND</h1>
                    <p>Player: {this.state.player.name}</p>
                    <p>Current Location: {this.state.player.title}</p>
                    <p>Description: {this.state.player.description}</p>
                    <input type="text" placeholder="Enter Command Here" />
                    <div>
                        <h2>Players in Room</h2>
                        <div>{this.state.player.players.length !== 0 ? 
                            <h3>{this.state.player.players.map(player => {
                                return (
                                <p>{player}</p>)
                            })}
                            </h3> : ( 
                                <h3>No players in the Room</h3>
                            )}
                        </div>
                        <button>West</button>
                        <div><button>North</button><button>South</button></div>
                    </div>
                </div>
                <div>
                    <Link to="/">
                        <button onClick={logout}>Log Out</button>
                    </Link>
                </div>
           </>
       )
    }
}

export default Game;
