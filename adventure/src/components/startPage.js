import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class startPage extends Component{

    render() {
        return(
            <div className = 'welcomeBox'>
            <div className = 'intro'>Welcome To The Adventure Game!</div>
            <Link to = {`/login`}>
                <button>Continue Adventure</button>
            </Link>

            <Link to = {`/registration`}>
                <button>Create Player</button>
            </Link>
            </div>
        )
    }
}

export default startPage;