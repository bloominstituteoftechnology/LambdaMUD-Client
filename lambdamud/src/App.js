import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import GameView from './components/GameView';

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                <h1 className="App-title">Welcome to LambdaMUD</h1>
                </header>
                <Route exact path='/' render={() => <Link to='/login'>Login</Link>} />
                <Route path='/login' render={() => <Login />} />
                <Route path='/Register' component={Register} />
                <Route path='/GameView' component={GameView} />
            </div>
        );
    }
}

export default App;
