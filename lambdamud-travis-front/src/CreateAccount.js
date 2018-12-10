import React from 'react';
import axios from 'axios';

export default class CreateAccount extends React.Component {
    state = {
        username: '',
        password1: '',
        password2: ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = e => {
        const { username, password1, password2 } = this.state;
        axios
        .post('https://lambdamud-backend-travis.herokuapp.com/api/registration/')
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
}