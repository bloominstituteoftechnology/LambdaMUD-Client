import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
// import logo from './logo.svg';
import '../styles/App.css';
import Login from './Login';
import Registration from './Registration';
import Adv from './Adv';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="App">

        {/* <div className='nav-container'>
          <Link to='/api/registration'>Register</Link>
          <Link to='/api/login'>Log in</Link>
        
        </div> */}
        <Route
          exact
          path='/'
          component={Home}
        />

        <Route 
          exact
          path='/api/registration'
          component={Registration}
        />

        <Route 
          exact
          path='/api/login'
          component={Login}
        />

        <Route
          exact
          path='/api/adv/init'
          component={Adv}
        />
      </div>
    );
  }
}

export default withRouter(App);
