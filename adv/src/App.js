import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import RegistrationPage from './components/RegistrationPage';
import Login from './components/Login';
import Adventure from './components/Adventure';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <Route path='/api/registration' component={RegistrationPage} />
                <Route path='/api/login' component={Login} />
                <Route exact path='/api/adv/init' component={Adventure} />
            </div>
        );
    }
}

export default App;
