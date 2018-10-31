import React, { Component } from 'react';
import logo from './logo.svg';
import {Link, Route} from "react-router-dom";
import axios from "axios";


import './App.css';





class App extends Component {
  state = {
    mudO: {},
    players: "",
    direction: "",
    say: ""
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  componentDidMount() {

  }

  get 

  render() {
    return (
      <div className="mud-container">
        <div className="header">
          <h1>Lambda MUD</h1>
        </div>
        <div className="text-output">
          {/* render the json object here */}
        </div>
        <form className="input-form">
          <input type="text" name="" id=""/>
          <div className="save-btn">
            SEND
          </div>
        </form>
        <Route
          path="/"
          render={ props => {
            return (
              <Chat/>
                      )
}}
        
        />
      </div>
    );
  }
}

export default App;
