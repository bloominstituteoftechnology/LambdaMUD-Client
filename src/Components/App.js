/***************************************
 * 
 * App checks for a valid token and decides which component to pass to the route
 * 
 **************************************/

import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'

import Portal from './Portal/Portal'
import Adventure from './Adventure/Adventure'

import './App.css'

class App extends Component {
  state = {
    component: null
  }

  // validates token and places the appropriate component on state
  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token) {
       axios
        .get(process.env.REACT_APP_INIT_URL, {headers: { Authorization: token }})
        .then(res => {
          if (res.data.uuid) {
            this.setState({ component: Adventure })
          } else {
            this.setState({ component: Portal })
          }
        })
        .catch(err => {
          console.log(err)
          this.setState({ component: Portal })
        })
    } else {
        this.setState({ component: Portal })
    }
  }

  // waits for component to be placed on state then renders component
  render() {
    return (
      <Router>
        {!this.state.component ? (
            <p>... loading ...</p>
        ) : (
          <div className="App">
            <Route exact path = '/' component = { this.state.component } />
          </div>
        )}
      </Router>
      
    );
  }
}

export default App;
