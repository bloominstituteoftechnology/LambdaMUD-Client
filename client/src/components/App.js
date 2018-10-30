import React, { Component } from "react";
import "./App.css";
import HomePage from './HomePage.js';
import LoginScreen from './LoginScreen.js'
import RegisterPage from './Register.js'
class App extends Component {
  render() {
    return (
      <div className="App container">
        <header className="App-header">
          {/* <HomePage /> */}
          {/* <LoginScreen /> */}
          <RegisterPage />
        </header>
      </div>
    );
  }
}

export default App;
