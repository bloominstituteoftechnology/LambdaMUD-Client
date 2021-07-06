import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Game from './components/Game/Game';

const App = () => {

  return (
    <div className="App">
      <Route exact path="/" render={props => <Home {...props} />}/>
      <Route path="/register" render={props => <Register {...props} />}/>
      <Route path="/login" render={props => <Login {...props} />}/>
      <Route path="/game" render={props => <Game {...props} />}/>
    </div>
  );
}

export default App;
