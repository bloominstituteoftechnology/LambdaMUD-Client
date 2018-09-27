import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route'

//import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Display from './components/Display/Display';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
        </header>
        <p className="App-intro">
           <Route path='/' exact component={Register} /> 
           <Route path='/login' exact component={Login}/>
           <Route path='/display' exact component={Display}/>
           
        </p>
      </div>
    );
  }
}

export default App;


