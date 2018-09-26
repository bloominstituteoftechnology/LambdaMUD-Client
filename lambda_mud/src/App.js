import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import axios from 'axios'
import Login from './components/Login'
import Signup from './components/Signup'
import Game from './components/Game'
import Navbar from './components/Navbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
    }
  }

  componentDidMount() {
    if(this.state.logged_in) {
      axios({
        method: 'post',
      })
    }
  }

  // Handles both Signup and Login by accepting appropriate URLS and arguments for each
  handleSignin = (userInfo, URL) => {
    axios({
      method: 'post',
      url: URL,
      headers: {"Content-Type": "application/json"},
      data: userInfo,
    }).then(res => {
      const token = res.data.key
      localStorage.setItem('token', token)
      this.setState({'username': userInfo.username})
      this.props.history.push('/game')
      console.log(res)
    })
    .catch(err => {
      console.log(err.response.data.error)
    })
  }

  handleLogout = () => {
    localStorage.removeItem('token')
    this.setState({ 'username': '' })
  }

  render() {
    return (
      <div>
        <Route path='/' render={props => <Navbar {...props} handleLogout={this.handleLogout} username={this.state.username}/>} />
        <Route exact path='/signup' render={props => <Signup {...props} handleSignin={this.handleSignin}/>} />
        <Route exact path='/login' render={props => <Login {...props} handleSignin={this.handleSignin}/>} />
        <Route path='/game' render={props => <Game {...props} username={this.state.username}/>} />
      </div>
    );
  }
}

export default withRouter(App);
