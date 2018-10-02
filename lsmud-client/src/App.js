import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MainContent />
      </div>
    );
  }
}

export default App;
