import React from 'react';
import { Link } from 'react-router-dom';

const Game = () => {
    const Logout = event => {
        localStorage.clear();
    };

    return (
        <>
            <div>
                Game Page
            </div>
            <div>
                <div>    
                    <Link to="/">
                        <button onClick={Logout}>Log Out</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Game;