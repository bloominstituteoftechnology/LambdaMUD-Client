import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import {register} from './actions/index';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className = 'nav-container'>
        <h1>Nav Goes Here</h1>
        </div>

        <div className = 'app-container'>
        <Switch>
          <Route exact path = '/register' component={Register}/>
          {/* routes go here */}
        </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // state goes here
    isLoggedIn: state.isLoggedIn,
  }
}

export default withRouter(connect(mapStateToProps, {
  register,
})(App));
