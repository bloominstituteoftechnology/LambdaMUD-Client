import React, { Component } from 'react';
import './App.css';

import Register from './components/Register';

class App extends Component {
    state = {
        creatingUser: false,
        loggedIn: false
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (token) {
            this.setState({ loggedIn: true })
        }
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          LambdaMUD Client
        </header>
        <body>
            <Register />
        </body>
      </div>
    );
  }
}

export default App;
