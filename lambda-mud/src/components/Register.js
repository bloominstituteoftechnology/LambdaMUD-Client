import React from 'react';
import axios from 'axios';

const url = 'https://francis-t-lambda-mud.herokuapp.com'
const url1 = 'http://localhost:3000'

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: '',
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    submit = e => {
        e.preventDefault();
        const { username, password1, password2 } = this.state;
        if (password1 !== password2){
            alert('Passwords do not match. Please re-enter passwords.')
        } else {
            axios.post(`${url}/api/registration`, this.state)
                .then( res => {
                    this.setState({username: '', password1:'', password2: ''});
                    localStorage.setItem('token', res.data.key)
                    //href to component
                    //window.location.href=`${url}/api`;
                })
                .catch(err => console.log(err.message));
        }
    }
    render(){
        return(
            <div>
                <h1>Register Page</h1><br />
                <input onChange={this.handleChange}
                    name='username' type='text'
                    placeholder='Username'/><br />
                <input onChange={this.handleChange}
                    name='password1' type='password'
                    placeholder='Password'/><br />
                <input onChange={this.handleChange}
                    name='password2'
                    type='password'
                    placeholder='Re-type Password'/><br />
                <button onClick={this.submit}>Connect</button>
            </div>
        )
    }
}

export default Register;