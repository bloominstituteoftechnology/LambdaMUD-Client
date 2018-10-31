import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import GameView from './components/main';
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      title: '',
      description: '',
      players: [],
      uuid:'',
    }
    console.log(this.state)
  }

//-------- Handler Functions----------//

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value })
}

handleSubmit = event => {
  event.preventDefault();
}


  render() {
    return (
      <div className="App">

       <Route exact path = "/login" render = {props =>
          (<Login {...props}
          handleSubmit = {this.handleSubmit}
          handleChange = {this.handleChange}
          handleLogin = {this.handleLogin}
          handleData = {this.handleData}

          />)}
        />

        <Route path = '/register' render = {props =>
          (<Register {...props}
            handleSubmit = {this.handleSubmit}
            handleChange = {this.handleChange}
            handleRegister = {this.handleRegister}
          />)}
        />

        <Route path = '/main' render = {props =>
          (<GameView {...props}
            handleData = {this.handleData}
          />)}
          />
      </div>
    );
  }
}

export default App;
