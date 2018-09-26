import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import './components/LoginReg';
import './components/Main'

class App extends Component {
  state = { loggedIn: false }

  componentDidMount() {
    if (localStorage.getItem('lambdaMudKey')) {
      this.setState({ loggedIn: true });
    }
  //   axios.get('https://mudmud.herokuapp.com/api/adv/init', {headers: {Authorization: 'Token 1e85198a887bf656c4da17ea8bc9e4e3d4eea4c7'}})
  //     .then(response => {
  //       console.log(response)
  //     })
  }

  render() {
    return (this.state.loggedIn ? <Main /> : <LoginReg />)
  }
}

export default App;
