import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    state = {
        username: '', 
        password: ''
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
        .post('https://lambdamud-adrianadames.herokuapp.com/api/login', this.state)
        .then(res => {
            // const key = res.data['key'];
            // localStorage.setItem('key', key);
            // console.log('Server response: ', key)
            console.log('Server response: ', res)
        })
        .catch(err => {
            // res.status(500).json({err});
            console.error('Axios failed')
        });
    }

    render() {
        return(
            <div>
                <h1> Login </h1>
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
                            name = 'password'
                            value = {this.state.password}
                            onChange = {this.inputChangeHandler}
                        />
                    </div>

                    <div>
                        <button type = 'submit'>Login</button>
                    </div>
                </form>

            </div>
        )
    }



}

export default Login