import React from 'react';
import axios from 'axios';
import { RegisterForm, RegisterContainer, RegisterInput, RegisterButton, RegisterFormContainer } from './StyledComponents/Register';
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

    register = () => {
        const user = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 };

        axios
            .post('https://salty-tundra-21950.herokuapp.com/api/registration', user)
            .then(response => {
                localStorage.setItem('token', response.data.key);
                this.props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <RegisterContainer>

                <MainHeaderContainer>
                    <MainHeader>Create Account Screen</MainHeader>
                </MainHeaderContainer>

                <RegisterFormContainer>

                    <RegisterForm>
                        <RegisterInput onChange={this.handleInput} placeholder='Login' value={this.state.username} name='username' type='text' />
                        <RegisterInput onChange={this.handleInput} placeholder='Password' value={this.state.password1} name='password1' type='password' />
                        <RegisterInput onChange={this.handleInput} placeholder='Password again' value={this.state.password2} name='password2' type='password' />
                        <RegisterButton onClick={this.register}>Connect</RegisterButton>
                    </RegisterForm>

                </RegisterFormContainer>

            </RegisterContainer>
        );
    }
}

export default Register;