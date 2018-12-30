import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>MOK's Lambda MUD</h1>
                <h3>Adventure Time</h3>
                <h3>| (• ◡•)| (❍ᴥ❍ʋ)</h3>
                <Link to='/login'>Sign In </Link>
                <Link to='/register'> Sign Up</Link>
            </div>
        )
    }
}
export default Home;