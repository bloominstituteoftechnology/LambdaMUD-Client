// App.js
// Parent component that has routes to different children components

import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import Register from './components/Register';
import Game from './components/Game';
import Authenticate from './components/Authenticate';

class App extends Component {
  constructor() {
    super();
    // Initializes state for loggedIn boolean
    this.state = {
      loggedIn: false
    }
  }

  // Gets token and username from localStorage, if both are present, sets state that loggedIn is true
  // Pushes page to game component if logged in
  // Pushes page to login component otherwise
  componentDidMount = () => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('username');
    if (token && username) {
      this.setState({loggedIn: true})
      this.props.history.push('/')
    } else {
      this.setState({loggedIn: false})
      this.props.history.push('/login')
    }
    
  }

  // Handles login by setting items in localStorage and state
  handleLogin = (token, username) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    this.setState({loggedIn: true})
  }

  // Handles logout by removing items from localStorage and setting state, pushing to login component
  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.props.history.push('/login')
    this.setState({loggedIn: false})
  }

  render() {
    // If logged in show this return div
    if (this.state.loggedIn) {
      return (
        <div className="App">
        <header className="App-header">
          <h1>LambdaMUD - GHR</h1>
          {/* Show game route */}
          <Route path="/" render={props => <Game {...props} logout={this.handleLogout} />} />
        </header>
      </div>
    );
  } else { // If logged out go to login and register components
    return (
      <div>
      <Route path="/login" render={props => <AuthenticatedApp {...props} login={this.handleLogin} />} />
      <Route path="/register" render={(props) => <Register {...props} login={this.handleLogin}/>} />
      </div>
    )
  }
  }
}

// Pass in App to Authenticate component
const AuthenticatedApp = Authenticate(App)

// Use withRouter to be able to access this.props.history.push in App.js
export default withRouter(App);
