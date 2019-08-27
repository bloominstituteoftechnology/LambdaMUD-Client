import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" render={props => <Home {...props} />}/>
      <Route path="/register" render={props => <Register {...props} />}/>
      <Route path="/login" render={props => <Login {...props} />}/>
    </div>
  );
}

export default App;
