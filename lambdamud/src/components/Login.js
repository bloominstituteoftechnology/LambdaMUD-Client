import React from 'react';
import axios from 'axios';
import { LoginForm, LoginContainer, LoginInput, LoginButton, LoginFormContainer } from './StyledComponents/Login';
import { MainHeaderContainer, MainHeader } from './StyledComponents/Header';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    login = () => {
        const credentials = { username: this.state.username, password: this.state.password };

        axios
            .post('https://salty-tundra-21950.herokuapp.com/api/login', credentials)
            .then(response => {
                localStorage.setItem('token', response.data.key);
                this.props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <LoginContainer>

                <MainHeaderContainer>
                    <MainHeader>Login Screen</MainHeader>
                </MainHeaderContainer>

                <LoginFormContainer>

                    <LoginForm>
                        <LoginInput onChange={this.handleInput} placeholder='Login' value={this.state.username} name='username' type='text' />
                        <LoginInput onChange={this.handleInput} placeholder='Password' value={this.state.password} name='password' type='password' />
                        <LoginButton onClick={this.login}>Connect</LoginButton>
                    </LoginForm>

                </LoginFormContainer>

            </LoginContainer>
        );
    }
}

export default Login;