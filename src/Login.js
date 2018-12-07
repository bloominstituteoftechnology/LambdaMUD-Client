import React from 'react';
import axios from 'axios';
import GameScreen from './GameScreen';


export default class LoginForm extends React.Component {
    
    state = {
        username: '',
        password: '',
        loggedIn: false
    }

    onChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.id]: value
        })
    }
    onSubmitHandler = (e) => {
        this.loggedIn();
    }

    loggedIn() {
        const { username, password } = this.state;
        axios.post(`https://sean-lambdamud.herokuapp.com/api/login`
            , { username, password })
            .then(res => {
                console.log(res);
                // calling the parent, or App.js
                localStorage.setItem("Token", res.data.key);
                this.props.loadGameScreen(res.data.key);
            });
    }

    render() {
        return (
            <div>
                    
                    <input id="username" placeholder="username" value={this.state.username} onChange={this.onChangeHandler} />
                    <input id="password" placeholder="password" value={this.state.password} onChange={this.onChangeHandler} />
                    <button id="submit" onClick={this.onSubmitHandler}>Submit</button>
                

            </div>
        )
    }

}