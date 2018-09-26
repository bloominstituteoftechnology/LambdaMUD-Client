import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    state= {
        username: '',
        password: ''
    }
    render() {
        return (
            <div className="Register">
                <h1> Register Component </h1>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input 
                            value={this.state.username}
                            onChange={this.inputChangeHandler} 
                            type="text" 
                            name="username"/>
                    </div>
                    <div>
                        <input 
                            value={this.state.password} 
                            onChange={this.inputChangeHandler} 
                            type="password" 
                            name="password" />
                    </div>
                    <div>
                        <button type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    submitHandler = event => {
        event.preventDefault();

        axios.post('https://kevintena-lambdamudbackend.herokuapp.com/api/register', this.state).then(res => {
            console.log(res.data);
            const token = res.data.key;

            localStorage.setItem('jwt', token);

        })
        .catch(err => {
            console.error('error.response');
        });

        console.log('state', this.state);
    };
}

export default Register;