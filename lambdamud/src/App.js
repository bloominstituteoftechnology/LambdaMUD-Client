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
                <h1 className="App-title">LambdaMUD</h1>
                <div className="Intro-container">
                <h3>Welcome to Lambda World!  An interactive multi-User Dungeon Game that will keep you entertained for hours.</h3>
                <h2>To Begin your Adventure - Just Click "Enter" Button!</h2>
                </div>
                <Route exact path='/' render={() => <Link to='/login'><button className="Enter">Enter</button></Link>} />
                </header>
                <Route path='/login' component={Login} />
                <Route path='/Register' component={Register} />
                <Route path='/GameView' component={GameView} />
            </div>
        );
    }
}

export default App;
