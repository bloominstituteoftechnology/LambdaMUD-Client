import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }

    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitRegister = (event) => {
        event.preventDefault();
        axios.post('https://lambdamud-ghr.herokuapp.com/api/registration', this.state)
        .then(response => {
            console.log(response)
        })
    }

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.submitRegister} className="registerForm">
                    <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler}></input>
                    <input type="password" name="password1" placeholder="Password" value={this.state.password1} onChange={this.changeHandler}></input>
                    <input type="password" name="password2" placeholder="Password again" value={this.state.password2} onChange={this.changeHandler}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )

    }
    
}

export default Register;