import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='root'>
        <div className='message'></div>
        <div className='controller'>
          <button>West</button>
          <div className='column'>
            <button>North</button>
            <button>South</button>
          </div>
          <button>East</button>
        </div>
      </div>
    );
  }
}

export default App;
