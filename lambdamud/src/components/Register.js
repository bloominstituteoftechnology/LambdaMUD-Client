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
            password2: '',
            loading: false
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    register = event => {
        event.preventDefault();
        const user = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 };

        this.setState({ loading: true })
        axios
            .post('https://salty-tundra-21950.herokuapp.com/api/registration', user)
            .then(response => {
                this.setState({ loading: false })
                localStorage.setItem('token', response.data.key);
                this.props.history.push('/');
            })
            .catch(err => this.setState({ loading: false }));
    }

    render() {
        return (
            <RegisterContainer>

                <MainHeaderContainer>
                    <MainHeader>Create Account Screen</MainHeader>
                </MainHeaderContainer>

                <RegisterFormContainer>

                    <RegisterForm onSubmit={this.register}>
                        <RegisterInput onChange={this.handleInput} placeholder='Login' value={this.state.username} name='username' type='text' />
                        <RegisterInput onChange={this.handleInput} placeholder='Password' value={this.state.password1} name='password1' type='password' />
                        <RegisterInput onChange={this.handleInput} placeholder='Password again' value={this.state.password2} name='password2' type='password' />
                        <RegisterButton
                            type='submit'>
                            {this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : 'Connect'}
                        </RegisterButton>
                    </RegisterForm>

                </RegisterFormContainer>

            </RegisterContainer>
        );
    }
}

export default Register;