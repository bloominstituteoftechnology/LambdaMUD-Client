import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Login  from './components/Authenticate/Login';
import Register from './components/Authenticate/Register';
//import MainPage from './components/Main/MainPage';




class App extends Component {
  render() {
    return (
      <div className="App">
	<Route path='/login' component={Login} />
	<Route path='/register' component={Register} />    
      </div>
    );
  }
}

export default App;
