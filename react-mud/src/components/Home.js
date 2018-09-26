import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return(
            <div className="home">
                <h1>Welcome to Tristan's Lambda MUD game!</h1>
                <nav>
                    <Link to={'/login'}>Login</Link>                    
                    <Link to={'/registration'}>Register</Link>
                </nav>
            </div>
        )
    }
}
export default Home;