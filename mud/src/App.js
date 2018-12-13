import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import GameView from './components/GameView';

class App extends Component {
  constructor(props){
    super()
    this.state = {
      Registered: true,
      isLoggedIn: true,
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
      this.setState({isLoggedIn: true})
    }
  }

  register = (newUser) => {
    axios.post("http://localhost:9000/api/registration", newUser)
      .then(res => {
        localStorage.setItem('token', res.data.key)
        this.setState({isLoggedIn: true})
      })
      .catch(err => {console.log(err)})
  }

  login = (user) => {
    axios.post("http://localhost:9000/api/registration", user)
      .then(res => {
        localStorage.setItem('token', res.data.key)
        this.setState({isLoggedIn: true})
      })
      .catch(err => {console.log(err)})
  }

  logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    this.setState({isLoggedIn: false})
  }

  registeredOff = () => {
    this.setState({Registered: false})
}

  render() {
    if(this.state.isLoggedIn){
      return(
        <div>
          <GameView />
        </div>
      )
    }
    return (
      <div className="App">
       <Route exact path="/" render={(props) => <Form {...props} Registered = {this.state.Registered} register = {this.register} login = {this.login} registeredOff = {this.registeredOff}/>} />
      </div>
    );
  }
}

export default App;
