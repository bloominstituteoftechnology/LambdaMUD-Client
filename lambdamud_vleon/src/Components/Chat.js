import React, { Component } from 'react';
import logo from './logo.svg';
import {Link, Route} from "react-router-dom";
import axios from "axios";
import './App.css';

class Chat extends Componenet {
    constructor(props) {
        super(props);
        this.state={
            message: ""
        }
    }






    render(){
        return (
            <div className="chat-container">
                <h4>Messenger</h4>
                {/* render the chat window here */}
            </div>
        );
    };
}

export default Chat;