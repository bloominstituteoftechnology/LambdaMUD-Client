import React, { Component } from 'react';
import axios from 'axios';

class CreateAccount extends Component {
    state = {
        username: '',
        password1: '', 
        password2: ''
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        console.log('name: ', name, 'value: ', value);
        this.setState({[name]: value})
    }
  
    submitHandler = (e) => {
      e.preventDefault();
      console.log('state', this.state)

      axios
        .post('https://lambdamud-adrianadames.herokuapp.com/api/register', this.state)
        .then(res => {
            const key = res.data['key'];
            localStorage.setItem('key', key);
            console('Server response: ', key)
        })
        .catch(err => {
            // res.status(500).json({err});
            console.error('Axios failed')
        });
    }

    render() {
        return(
            <div>
                <h1> Create Account </h1>
                <form onSubmit = {this.submitHandler}>
                    <div>
                        <input 
                            type = 'text'
                            name = 'username'
                            value = {this.state.username}
                            onChange = {this.inputChangeHandler}
                        />
                    </div>
                    <div>
                        <input 
                            type = 'password'
                            name = 'password1'
                            value = {this.state.password1}
                            onChange = {this.inputChangeHandler}
                        />
                    </div>
                    <div>
                        <input 
                            type = 'password'
                            name = 'password2'
                            value = {this.state.password2}
                            onChange = {this.inputChangeHandler}
                        />
                    </div>
                    <div>
                        <button type = 'submit'>Create Account</button>
                    </div>
                </form>

            </div>
        )
    }
}

export default CreateAccount