import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import LoginReg from './components/LoginReg';

class App extends Component {
  state = { loggedIn: true }
   componentDidMount() {
    if (localStorage.getItem('lambdaMudKey')) {
      this.setState({ loggedIn: true });
    }
  }
   render() {
    return (this.state.loggedIn ? <Main /> : <LoginReg />)
  }
}
 export default App;


