import React from 'react';
import { Link } from 'react-router-dom';

const Game = () => {
    const Logout = event => {
        localStorage.clear();
    };

    return (
        <>
            <div className='controller'>
                <h1>Game On</h1>
                <button>West</button>
                <div className='column'><button>North</button><button>South</button></div>
                <button>East</button>
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

<<<<<<< HEAD
export default Game;
=======
export default Game;
>>>>>>> f5a08feb602c5c2f375d76de7fb775031beb72bb
