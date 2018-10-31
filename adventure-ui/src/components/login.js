import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props);
        console.log('login props', props)

        this.state = {
            username: '',
            password: ''
        };
        console.log('login state', this.state)
    }

    handleUser = event => {
        this.setState({
            username: event.target.value,
        })
    }

    handlePassword = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = event => {
        event.preventDefault()
        const creds = { 
            username: this.state.username, 
            password: this.state.password };
      
        axios
          .post('https://baldwin-adv-project.herokuapp.com/api/login', creds)
          .then(response => {
            console.log(response)
            console.log(this.state)
            localStorage.setItem('token', response.data.key);
            localStorage.setItem('username', this.state.username);
          })
          .catch(error => console.log(error));
      
          this.setState({
            username: '',
            password: '',
          })
      }


    render() {
        return (
            <div className = "login">
                <h3>let the games begin</h3>
                <form onSubmit = {this.handleLogin}>
                    <input type = "text"
                    onChange = {this.handleUser}
                    value = {this.state.username}
                    id = 'username'
                    placeholder = "Username"
                    />
                    <input type = "password"
                    onChange = {this.handlePassword}
                    value = {this.state.password}
                    id = 'password'
                    placeholder = "Password"
                    
                    />
                    <Link to ={`/main`}>
                        <button onClick = {this.handleLogin}>Login</button>
                    </Link>
                    <div>
                        <h4>click below to join</h4>
                        <Link to = {`/register`}>
                            <button>Register</button>
                        </Link>
                    </div>
                </form>
            </div>

        )
    }
}

export default Login;