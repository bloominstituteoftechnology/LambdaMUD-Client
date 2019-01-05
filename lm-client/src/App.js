import React, { Component } from 'react';
import Login from './login';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom';
import Register from './register';
import Main from './main';
import './app.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className = "container">
          <Link to ="/"><h2>LambdaMUD</h2></Link>
            <Link to ="/login">Login</Link>
            <Link to="/register"> Register </Link>
          <Switch>
            <Route exact path = "/" component = {Main}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/register" component = {Register}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
