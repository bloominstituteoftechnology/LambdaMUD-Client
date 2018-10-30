import React, { Component } from 'react';
import RegisterForm from './components/registration';
import LoginForm from './components/login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegisterForm/>
      </div>
    );
  }
}

export default App;
