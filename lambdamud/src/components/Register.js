import React from 'react';
import { RegisterForm, RegisterContainer, RegisterInput, RegisterButton } from './StyledComponents/Register';
import { MainHeaderContainer, MainHeader } from './StyledComponents/Header';

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <RegisterContainer>

                <MainHeaderContainer>
                    <MainHeader>Create Account Screen</MainHeader>
                </MainHeaderContainer>

                <RegisterForm>
                    <RegisterInput onChange={this.handleInput} placeholder='Login' value={this.state.username} name='username' type='text' />
                    <RegisterInput onChange={this.handleInput} placeholder='Password' value={this.state.password1} name='password1' type='password' />
                    <RegisterInput onChange={this.handleInput} placeholder='Password again' value={this.state.password2} name='password2' type='password' />
                    <RegisterButton>Connect</RegisterButton>
                </RegisterForm>

            </RegisterContainer>
        );
    }
}

export default Register;