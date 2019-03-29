import React, { Component } from 'react';
import './App.css';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from './actions';

import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Main from'./components/Main'

class App extends Component {
  render() {
    return (
      <div className="App">       
          <Route exact path = '/' render = {(props)=><Home {...props} />} />
          <Route exact path = '/register' render = {(props)=><Register {...props} />} />
          <Route exact path = '/login' render = {(props)=><Login {...props} />} />
          <Route 
            exact path = '/main' 
            render = {(props)=>
              <Main {...props} {...this.props} />} 
          />
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {    
    fetchingInit: state.fetchingInit,
    title: state.title,
    description: state.description,
    name: state.name,
    players: state.players,
    data: state.data,
    error: state.error,
    uuid: state.uuid
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(App)
);