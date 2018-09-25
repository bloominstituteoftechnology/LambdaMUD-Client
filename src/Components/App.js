import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'

import Login from './Login/Login'
import Register from './Register/Register'
import Adventure from './Adventure/Adventure'

import './App.css'

class App extends Component {
  state = {
    routes: null
  }

  routeKey() {
    return Math.floor(Math.random() * Math.floor(999999))
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
       axios
        .get(process.env.REACT_APP_INIT_URL, {headers: { Authorization: token }})
        .then(res => {
          if (res.data.uuid) {
            const routes = [
              <Route key={this.routeKey()} path = '/' component = { Adventure } />
            ]
            this.setState({ routes })
          } else {
            const routes = [
              <Route key={this.routeKey()} path = '/' component = { Login } />,
              <Route key={this.routeKey()} path = '/register' component = { Register } />
            ]
            this.setState({ routes })
          }
        })
        .catch(err => {
          console.log(err)
          const routes = [
            <Route key={this.routeKey()} exact path = '/' component = { Login } />,
            <Route key={this.routeKey()} path = '/register' component = { Register } />
          ]
          this.setState({ routes })
        })
    } else {
      const routes = [
        <Route key={this.routeKey()} exact path = '/' component = { Login } />,
        <Route key={this.routeKey()} path = '/register' component = { Register } />
      ]
      this.setState({ routes })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>LambdaMUD</h1>
          {this.state.routes}
        </div>
      </Router>
      
    );
  }
}

export default App;
