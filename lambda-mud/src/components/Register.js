import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Button = styled.button`
    background: teal;
    color: white;
    font-size: 1rem;
    font-weight: 600
    border: 2px solid white;
    border-radius: 0.5rem;
    right: 0;
    padding: 0.5rem;
`;

const url = 'https://francis-t-lambda-mud.herokuapp.com'
//const url1 = 'http://localhost:3000'

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
        const { password1, password2 } = this.state;
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
                .catch(err => alert(err.message));
        }
    }
    render(){
        return(
            <div>
                <h1>Register</h1><br />
                <input onChange={this.handleChange}
                    name='username' type='text'
                    placeholder='Username'
                    style={{padding:'0.5rem', margin:'1rem'}}/><br />
                <input onChange={this.handleChange}
                    name='password1' type='password'
                    placeholder='Password'
                    style={{padding:'0.5rem', margin:'1rem'}}/><br />
                <input onChange={this.handleChange}
                    name='password2'
                    type='password'
                    placeholder='Re-type Password'
                    style={{padding:'0.5rem', margin:'1rem'}}/><br />
                <Button style={{width:'200px', margin:'1rem', outline:'0'}} onClick={this.submit}>Register</Button>
            </div>
        )
    }
}

export default Register;