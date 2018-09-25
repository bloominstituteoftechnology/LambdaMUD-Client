import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        console.log(localStorage)
        if (!localStorage.getItem('token')) {
            return <div className='notes-private'>This game is private. You may be able to play it by <a href='/login'>logging in.</a> Don't have an account? <a href='/register'>Register here.</a></div>
        } else {
            return <div>
                `Welcome {localStorage.getItem('username')}` 
            </div>
        }
        
    }
}
 
export default Main;