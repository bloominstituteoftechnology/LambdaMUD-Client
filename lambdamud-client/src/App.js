import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom';
import Register from './components/Register';
import Game from './components/Game';
import Authenticate from './components/Authenticate';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }

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

  handleLogin = (token, username) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    this.setState({loggedIn: true})
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({loggedIn: false})
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="App">
        <header className="App-header">
          <h1>LambdaMUD - GHR</h1>
          
          <Route path="/" component={Game} />
        </header>
      </div>
    );
  } else {
    return (
      <div>
      <Route path="/login" render={props => <AuthenticatedApp {...props} login={this.handleLogin} />} />
      <Route path="/register" render={(props) => <Register {...props} login={this.handleLogin}/>} />
      </div>
    )
  }
  }
}

const AuthenticatedApp = Authenticate(App)

export default withRouter(App);
