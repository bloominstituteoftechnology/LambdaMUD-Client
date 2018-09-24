import React from 'react';
import { LoginForm, LoginContainer, LoginInput, LoginButton } from './StyledComponents/Login';
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

    render() {
        return (
            <LoginContainer>

                <MainHeaderContainer>
                    <MainHeader>Login Screen</MainHeader>
                </MainHeaderContainer>

                <LoginForm>
                    <LoginInput onChange={this.handleInput} placeholder='Login' value={this.state.username} name='username' type='text' />
                    <LoginInput onChange={this.handleInput} placeholder='Password' value={this.state.password} name='password' type='password' />
                    <LoginButton>Connect</LoginButton>
                </LoginForm>

            </LoginContainer>
        );
    }
}

export default Login;