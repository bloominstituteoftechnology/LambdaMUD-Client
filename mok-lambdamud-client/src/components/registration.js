import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends Component {
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
        const newUser = {
            username, password1, password2,
        };
        console.log(newUser);
        let data = JSON.stringify({
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.passwo
        })
        axios.post('', {
            headers: {
                'Content=Type': 'application/json',
            },
            withCredentials:false
        })
        .then(response => {
            localStorage.setItem('token', data, response.data.key);
            this.props.history.push('/api/adv/init')
        })
        .catch(error => console.log('registration error', error))

        this.setState({
            username: "",
            password1: "",
            password2: "",
        })
    }
    render() {
        return (
            <div>
                <Link to='/'>Home</Link>
                <Link to='/login'>Sign In</Link>
                <div>
                    <h1>MOK's Lambda MUD</h1>
                </div>
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
                    placeholder='password1' 
                    name='password1'
                    value={this.state.password1}
                    onChange={this.handleRegChange}
                    />
                    <input 
                    type='text'
                    placeholder='password2' 
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
export default Registration;