import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return <div>Main</div>
        // if (!localStorage.getItem('token')) {
        //     return  
        //         <div className='notes-private'>Notes are private. You may be able to view it by 
        //             <a href='/login'>logging in.</a> Don't have an account? <a href='/signup'>Signup here.</a></div>
        // } 
    }
}
 
export default Main;