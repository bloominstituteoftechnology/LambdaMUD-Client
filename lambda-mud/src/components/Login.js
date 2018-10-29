import React from 'react';
import axios from 'axios';

const url = 'https://francis-t-lambda-mud.herokuapp.com'
const url1 = 'http://localhost:3000'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    submit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        axios.post(`${url}/api/login`, {
                username: username,
                password: password
            })
            .then( res => {
                this.setState({username: '', password:''});
                localStorage.setItem('token', res.data.key)
                //href to component
                // window.location.href=`${url}/admin`;
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
                    name='password' type='password'
                    placeholder='Password'/><br />
                <button onClick={this.submit}>Connect</button>
            </div>
        )
    }
}

export default Login;