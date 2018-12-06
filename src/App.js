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
    loadGame: false,
    key: ''
  }

  handleClick = (e) => {
    console.log(e);
    console.log(e.target.id);
    const id = e.target.id;
    this.setState({
      [id]: true
    })
  }

  handleHome = () => {
    this.setState({
      login: false,
      register: false
    })
  }

  loadGameScreen = (key) => {
    console.log("Here!!!");
    this.setState({
       loadGame: true,
       login: false,
       key: key
    })
  }

  render() {

    return (
      <div className="App">
        <button type="home" onClick={this.handleHome}>Home</button>
        {this.state.login ? <LoginForm loadGameScreen={this.loadGameScreen}/> : this.state.register ? <Register /> : this.state.loadGame ? <GameScreen token={this.state.key} /> : <InitialScreen handleClick={this.handleClick} />}
      </div>
    );
  }
}

// so I just created a child component of App.js component
const InitialScreen = (props) =>
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
    <button id="login" onClick={props.handleClick}>Login</button>
    <button id="register" onClick={props.handleClick}>Signup</button>
  </div>;

export default App;
