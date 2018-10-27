import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'
import Game from './components/gameplay/Game'
import Navbar from './components/navbar/Navbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_in: sessionStorage.getItem('token') ? true : false,
      username: '',
      error: '',
    }
  }

  // Handles both Signup and Login by accepting appropriate URLS and arguments for each
  handleSignin = (userInfo, URL) => {

    axios.post(URL, userInfo).then(res => {
      const token = res.data.key
      sessionStorage.setItem('token', token)
      this.setState({ 'username': userInfo.username })
      this.props.history.push('/game')
      console.log("Response", res)
    })
      .catch(err => {
        this.setState({ 'error': err.response.data.error })
        console.log("Error123", this.state.error)
      })
  }

  handleLogout = () => {
    sessionStorage.removeItem('token')
    this.setState({ 'username': '' })
  }

  render() {
    return (
      <div>
        <Route path='/' render={props => <Navbar {...props} handleLogout={this.handleLogout} username={this.state.username} />} />
        <Route exact path='/' render={props => <Signup {...props} handleSignin={this.handleSignin} error={this.state.error} />} />
        <Route exact path='/login' render={props => <Login handleSignin={this.handleSignin} error={this.state.error} />} />
        <Route path='/game' render={props => <Game {...props} logged_in={this.state.logged_in} />} />
      </div>
    );
  }
}

export default withRouter(App);
