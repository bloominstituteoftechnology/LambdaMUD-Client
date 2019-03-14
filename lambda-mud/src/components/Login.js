import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Layout = styled.div`
    max-width: 500px;
    margin: 15% auto;
`;

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
const url1 = process.env.REACT_APP_FRONTEND_URL

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
                localStorage.setItem('Authorization', `Token ${res.data.key}`)
                window.location.href=`${url1}game`;
            })
            .catch(err => alert(err.message));
    }
    render() {
        return(
            <Layout>
                <h1>Login</h1><br />
                <input onChange={this.handleChange}
                    name='username' type='text'
                    placeholder='Username'
                    style={{padding:'0.5rem', margin:'1rem'}}/><br />
                <input onChange={this.handleChange}
                    name='password' type='password'
                    placeholder='Password'
                    style={{padding:'0.5rem', margin:'1rem'}}/><br />
                <Button style={{ 
                        width:'200px',
                        margin:'1rem',
                        outline:'0'
                    }} 
                    onClick={this.submit}
                >
                    Login
                </Button>
            </Layout>
        )
    }
}

export default Login;