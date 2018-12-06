import React, { Component } from 'react';
import './App.css';
import LoginForm from './Login';
import GameScreen from './GameScreen';
import Register from './Register';
import HomeScreen from './HomeScreen';

class App extends Component {
  
  state = {
    login: false,
    register: false,
  }

  handleClick = (e) => {
    const id = e.target.id;
    this.setState({
      [id]: true
    })
  }

  render() {
    
    const initialScreen = 
    <div>
      <div style={{
          border: "1px solid grey",
          height: "20vh",
          width: "30vw",
          display: "flex",
          justifyContent: "center"
    }}>
      The Super Adventure Game
      </div>
      <button id="login" onClick={this.handlClick}>Login</button>
      <button>Signup</button>
    </div>;

    return ( 
      <div className="App">
        {this.state.login ? LoginForm : initialScreen }
    </div>
    );
  }
}

export default App;
