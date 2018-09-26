import React, { Component } from 'react';
import axios from 'axios';
// import '../styles/Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }

   inputChangeHandler = (event) => {this.setState({[event.target.name]: event.target.value})}

   submitHandler = () => {
        const credentials = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 }
        axios.post('https://mylambdamud-project.herokuapp.com/api/registration/', credentials)
            .then(response => {
            		const token = response.data.key
                localStorage.setItem('key', token)
                this.props.history.push('/GameView')
            })
            .catch(error => console.log(`Register: ${error}`))
    }
    render() {
        return (
            <div className='Register'>
                <h1 className='title'>Create Account Screen</h1>
                <div>
                <input className='input'
	                name='username' value={this.state.username}
	                placeholder='Username'
	                onChange={this.inputChangeHandler}
                />
                </div>
                <div>
                <input className='input'
                	name='password1'
                	value={this.state.password1}
                	placeholder='Password'
                	onChange={this.inputChangeHandler}
                	type='password'
                />
                </div>
                <div>
                <input className='input'
	                name='password2'
	                value={this.state.password2}
	                placeholder='Password again'
	                onChange={this.inputChangeHandler}
	                type='password'
                />
                </div>
                <button onClick={this.submitHandler}>Submit</button>
            </div>
        );
    }
}

export default Register;

