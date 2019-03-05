import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Game from './components/Game';
import Navbar from './components/Navbar';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';


const Button = styled.button`
  height: 100px;
  width: 200px;
  border-radius: 5px;
  font-size: 2rem;
  background: teal;
  color: white;
  border: none;
  margin: 1rem auto;
  :hover {

  }
`;

class App extends Component {
  render() {
    return (
      <div>
        <h1 style={{color:'teal'}}>LambdaMUD</h1>
        <Navbar />
        <div className="App" style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <Route exact path='/login' component={Login} />
          <Route exact path='/registration' component={Register} />
          <Route exact path='/game' component={Game} />
        </div>
      </div>
    );
  }
}

export default App;
