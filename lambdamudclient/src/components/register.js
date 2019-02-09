import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password1: "",
            password2: "",
        }
    }
    handleRegChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    signUpUser = event => {
        event.preventDefault();
        const username = this.state.username;
        const password1 = this.state.password1;
        const password2 = this.state.password2;
        const newUser = [
            username, password1, password2,
        ];
        console.log(newUser);
        let data = {
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2
        }
        console.log(data);
        axios.post("https://lmabdamudmok.herokuapp.com/api/registration/", data)
        .then(response => {
            localStorage.setItem('jwt', response.data.key);
            // this.props.history.push('/api/adv/init')
            this.props.history.push('/api/adv/init/')
        })
        .catch(error => console.log('registration error', error.response))

        this.setState({
            username: "",
            password1: "",
            password2: "",
        })
    }
    render() {
        return (
            <div>
                <h2>Sign Up</h2>
                <form>
                    <input 
                    type='text'
                    placeholder='username' 
                    name='username'
                    value={this.state.username}
                    onChange={this.handleRegChange}
                    />
                    <input 
                    type='text'
                    placeholder='enter password' 
                    name='password1'
                    value={this.state.password1}
                    onChange={this.handleRegChange}
                    />
                    <input 
                    type='text'
                    placeholder='confirm password' 
                    name='password2'
                    value={this.state.password2}
                    onChange={this.handleRegChange}
                    />
                </form>
                <button onClick={this.signUpUser}>Sign Up</button>
            </div>
        )
    }
}
export default Register;