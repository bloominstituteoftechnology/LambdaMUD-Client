import React, { Component } from 'react';
import RegisterForm from './components/registration';
import LoginForm from './components/login';
import Game from './components/Game';
import './App.css';
import {withRouter, Route} from 'react-router-dom';
//container component for every other component//
class App extends Component {
  componentDidMount(){
    //when component is rendered redirects user to a route based on different conditions of the localStorage savedPage variable//
    const token=localStorage.getItem('token');
    if (token===null && localStorage.getItem('savedPage')!=='/signup') {
      this.props.history.push('/login');
    } else if (token===null) {
      this.props.history.push('/signup');
    } else {
      this.props.history.push('/main');
    }
  }
  render() {
    //renders view of the app component//
    return (
      <div className="App">
        <h1>Old School MUD</h1>
        <Route exact path='/login' component={LoginForm}/>
        <Route exact path='/signup' component={RegisterForm}/>
        <Route exact path='/main' component={Game}/>
      </div>
    );
  }
}

export default withRouter(App);
