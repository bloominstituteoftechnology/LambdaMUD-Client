import React from 'react';
import axios from 'axios';

export default class CreateAccount extends React.Component {
    state = {
        username: '',
        password1: '',
        password2: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        const { username, password1, password2 } = this.state;
        axios
        .post('https://lambdamud-backend-travis.herokuapp.com/api/registration/')
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    render() {
        <div>
            <input name="username" placeholder="username" value={this.state.username} onChange={this.handleChange}/>
            <input name="password1" placeholder="password1" value={this.state.password1} onChange={this.handleChange}/>
            <input name="password2" placeholder="password2" value={this.state.password2} onChange={this.handleChange}/>
            <button onClick={this.handleSubmit}>Create</button>
        </div>
    }
}