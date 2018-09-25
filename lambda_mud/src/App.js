import React, { Component } from 'react';
import './App.css';
import 

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
    }
  }

  render() {
    return (
    );
  }
}

export default App;
