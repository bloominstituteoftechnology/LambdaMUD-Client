import React from 'react';
import axios from 'axios';

const url = 'https://francis-t-lambda-mud.herokuapp.com'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password1: '',
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    submit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        axios.post(`${url}/api/login`, this.state)
            .then( res => {
                this.setState({username: '', password1:''});
                window.location.href=`${url}/admin`;
            })
            .catch(err => console.log(err.message));
    }
    render() {
        return(
            <div>
                <h1>Login Page</h1><br />
                <input onChange={this.handleChange}
                    name='username' type='text'
                    placeholder='Username'/><br />
                <input onChange={this.handleChange}
                    name='password1' type='password'
                    placeholder='Password'/><br />
                <button onClick={this.submit}>Connect</button>
            </div>
        )
    }
}

export default Login;