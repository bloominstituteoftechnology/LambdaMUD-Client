import React, { Component } from 'react';
import axios from 'axios';

class Registration extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password1: '',
            password2: '',
        }
    }

    handleInputChange = event => {
        console.log('handleInputChange called');
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const username = this.state.username;
        const password1 = this.state.password1;
        const password2 = this.state.password2;
        
        const newUser = {
            username,
            password1,
            password2,
        };
        
        // let data = JSON.stringify({
        //     username: this.state.username,
        //     password1: this.state.password1,
        //     password2: this.state.password2,
        // })
        
        axios
            .post('http://lambdamud-by-cameronsray.herokuapp.com/api/registration/',  newUser, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log('Registration response: ', response);
                localStorage.setItem('token', response.data.key);
                this.props.history.push('/api/adv/init')
            })
            .catch(err => console.log(err.response))

        this.setState({
            username: '',
            password1: '',
            password2: '',
        });
    }

    render() {
        return (
            <form>
                <input 
                    name='username'
                    type='text'
                    placeholder='username'
                    value={this.state.username}
                    onChange={this.handleInputChange}
                />

                <input 
                    name='password1'
                    type='text'
                    placeholder='password'
                    value={this.state.password1}
                    onChange={this.handleInputChange}
                />

                <input 
                    name='password2'
                    type='text'
                    placeholder='confirm password'
                    value={this.state.password2}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default Registration;