import React, {Component} from "react";
import {Route} from 'react-router-dom';
import "./App.css";
import Authenticate from './Authenticate'
import GamePage from './GamePage'
import Entry from './Entry'
import Login from './Login'

class App extends Component {
  render() {
    return <div className = "App" >
      <Route path = '/api/registration' component = {Authenticate} /> 
      <Route path='/api/login' component={Login} />
      <Route path='/api/adv/init' component={GamePage} />
      <Route exact path='/' component={Entry} /> 
     </div>
  }
}

export default App;