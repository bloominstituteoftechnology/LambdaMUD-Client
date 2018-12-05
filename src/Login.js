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
                this.setState({ loggedIn: true })
            });
    }

    render() {
        return (
            <div>
                {this.state.loggedIn ? (<div>GameScreen</div>) : (<div>
                    <input id="username" value={this.state.username} onChange={this.onChangeHandler} />
                    <input id="password" value={this.state.password} onChange={this.onChangeHandler} />
                    <button id="submit" onClick={this.onSubmitHandler}></button>
                </div>)}

            </div>
        )
    }

}