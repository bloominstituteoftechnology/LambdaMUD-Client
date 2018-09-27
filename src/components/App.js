import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import '../styles/App.css';
import Login from './Login';
import Registration from './Registration';
import Game from './Game';

class App extends Component {
    constructor() {
        super()
        this.state = {
            token: 0
        }
    }
    handleHelp = () => {
        const helpBtn = document.getElementById('help')
        const header = document.getElementById('App-header')
        helpBtn.style.display === 'none' ? helpBtn.style.display = 'block' : helpBtn.style.display = 'none'
        header.style.height === '1rem' ? header.style.height = '3rem' : header.style.height = '1rem'
    }
    render() {
        return (
            <div className="App">
                <header id="App-header">
                    <h1 className="App-title">Welcome to LambdaMUD</h1>
                    <div className='btn' onClick={this.handleHelp}>Help</div>
                    <div id='help'>
                        <p>Navigate in any direction using N, S, E, W</p>
                        <p>Use 'say' to speak to other users (Ex. say Hello Everyone!)</p>
                    </div>
                </header>
                <Route exact path='/' render={() => {
                    return (
                        <div>
                            <Link to='/login'>Login</Link>
                            <hr/>
                            <Link to='/registration'>Register</Link>
                        </div>    
                    )
                }} />
                <Route path='/login' render={(props) => <Login {...props} />} />
                <Route path='/registration' render={(props) => <Registration {...props} />} />
                <Route path='/game' render={(props) => <Game {...props} />} />
            </div>
        );
    }
}

export default App;
