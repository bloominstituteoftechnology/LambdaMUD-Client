import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = "/" 
    }

    render() { 
        console.log(localStorage)
        if (!localStorage.getItem('token')) {
            console.log('no token')
            return (
                <div className='game-private'>This game is private. You may be able to play it by <a href='/login'>logging in.</a> Don't have an account? <a href='/register'>Register here.</a>
                </div>
                )
        } else {
            return (
            <div>
                <button className="logout-but pt-sm-1" onClick={this.logout}>logout</button>          
                <p className='greeting'>Welcome {localStorage.getItem('username')}</p>
                <Link className='greeting' to='/play'>Start Game</Link>
            </div>
            )
        }
        
    }
}
 
export default Main;