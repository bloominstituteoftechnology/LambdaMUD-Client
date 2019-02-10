import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Registration from './components/Registration';
import Login from './components/Login';
import Adv from './components/Adv';

const host = 'https://stefarg-lambdamud.herokuapp.com/'

class App extends Component {
  constructor() {
    super();
    this.state = {
      cmd: "",
      username: "",
      password1: "",
      password2: ""
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  register = (e) => {
    console.log('register attempted')
    e.preventDefault();
    Axios.post(`${host}/api/registration`, this.state).then(
      this.setState({
        username: "",
        password1: "",
        password2: ""
      })
    )
  }
  login = e => {
    e.preventDefault();
    Axios.post(`${host}/api/login`, this.state).then(
      this.setState({
        username: "",
        password: ""
      })
    )
  }

  render() {
    return(
      <div>
        <Route path="/registration" component={Registration}/>
        <Route exact path="/" component={Login}/>
        <Route path="/adv" component={Adv}/>
      </div>
    )
  }
}
export default App;
