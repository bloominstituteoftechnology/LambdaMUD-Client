import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from "axios";

const LoginTitle = styled.h1`
    font-family: 'Grand Hotel', cursive;
    font-size: 64px;
    text-shadow:
        3px 3px 0 darkslategray,
        -1px -1px 0 darkslategray,  
        1px -1px 0 darkslategray,
        -1px 1px 0 darkslategray,
        1px 1px 0 darkslategray;
    color: white;
`

const LoginInput = styled.input`
    margin: 15px 0;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0 0 10px slategray;
    padding-left: 10px;
    font-family: 'Grand Hotel', cursive;
    font-size: 20px;
`

const LoginButton = styled.button`
    margin: 15px 0;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0 0 10px slategray;
    padding-left: 10px;
    
`

const RegistrationButton = styled.button`
    margin: 15px 0;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0 0 10px slategray;
    padding-left: 10px;
    
`

const PageLogin = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(lightblue, teal, gray);
`

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    };

    handleLoginChange = event => {
        this.setState({[event.target.name]: event.target.value})
      };

    loginHandler = (event) => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            axios
            .post("https://lambdamud-alee.herokuapp.com/api/login/", this.state)
            .then(res => {
                const token = res.data.key;
                localStorage.setItem("key", token);
                this.props.history.push("/")
            })
            .catch(err => console.log(err))
        }
    };


    
    render() {
    return ( 
        <PageLogin className="d-flex justify-content-center">
            <form autoComplete="off" className="login-container d-flex flex-column justify-content-center"> 
                <LoginTitle>LambdaMUD</LoginTitle>
                <LoginInput
                    type="text" 
                    placeholder="User Name" 
                    name="username" 
                    value={this.state.username}
                    onChange={this.handleLoginChange}
                />
                <LoginInput
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    value={this.state.passwrod}
                    onChange={this.handleLoginChange}
                />
                <LoginButton
                    onClick={this.loginHandler}>
                    Login
                </LoginButton>
                <Link to="/register">
                    <RegistrationButton>
                        Register
                    </RegistrationButton>
                </Link>
                
            </form>
        </PageLogin>
    )};
}
 
export default Login;