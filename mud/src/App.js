import React, { Component } from 'react';
import Login from './components/login/login';
import Room from './components/rooms/rooms';
import { Route } from "react-router-dom";
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
     
    }
  }


  render() {
    return (
      <div className="App">
      <p> in progress...</p>
      <i className="fas fa-gamepad fa-spin"></i>
       <Route exact path="/" component={Login}/>
       <Route exact path="/begin" render={props => (
            <Room
              {...props}
              init={this.init}
            />
          )}/>
      </div>
    );
  }
}

export default App;
