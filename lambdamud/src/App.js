import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Register from './components/Register';
import axios from 'axios';
import './App.css';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password1: '',
      password2: '',
    }
  }

  inputHandler = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  registerHandler = e => {
    e.preventDefault();

    let newPlayer = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2,
    }
    axios
    .post("https://lambdamudmboegner.herokuapp.com/api/registration/", newPlayer)
    .then(response => { 
      localStorage.setItem('Token', response.data.key);
    })
    .catch((error) => console.log(error.response))
  };


  render() {
    console.log(this.state)
    return (
      <div className="app">
        <div className="list">
            <Route exact path="/register" render={props=> <Register 
              {...props} 
              inputHandler={this.inputHandler}
              registerHandler={this.registerHandler}
              value={this.state} 
            />}/>
        </div>
      </div>
    )
  }
}