import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }
    loginHandler = event => {
        event.preventDefault();
        console.log('login working?', this.state);

        axios.post('', this.state).then(res => {
            console.log(res.data);
            localStorage.setItem('jwt', res.data.key);
            this.props.history.push('/api/adv/init/');
        })
        .catch(error => {
            console.log('login error', error)
        });
    }
    handleLogChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log('login handler', event.target.name, event.target.value);
    };
    render() {
        return (
            <div>
                <Link to='/'>Home</Link>
                <Link to='/register'>Sign Up</Link>
                <div>
                    <h1>MOK's Lambda MUD</h1>
                </div>
                <div>
                    <h2>Login</h2>
                    <form>
                        <input 
                        type='text'
                        placeholder='username' 
                        name='username'
                        value={this.state.username}
                        onChange={this.handleLogChange}
                        />
                        <input
                        type='password'
                        placeholder='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleLogChange}
                        />
                    </form>
                </div>
                <button onClick={this.loginHandler}>Sign In</button>
            </div>
        )
    }
}
export default Login;