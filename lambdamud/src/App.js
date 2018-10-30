import React, { Component } from 'react';
import RegisterForm from './components/registration';
import LoginForm from './components/login';
import Game from './components/Game';
import {withRouter, Route} from 'react-router-dom';

class App extends Component {
  componentDidMount(){
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
    return (
      <div className="App">
        <Route exact path='/login' component={LoginForm}/>
        <Route exact path='/signup' component={RegisterForm}/>
        <Route exact path='/main' component={Game}/>
      </div>
    );
  }
}

export default withRouter(App);
