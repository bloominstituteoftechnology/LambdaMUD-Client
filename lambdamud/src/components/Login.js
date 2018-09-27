import React from 'react';
import axios from 'axios';
import { LoginForm, LoginContainer, LoginInput, LoginButton, LoginFormContainer } from './StyledComponents/Login';
import { MainHeaderContainer, MainHeader } from './StyledComponents/Header';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false
        }
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    login = event => {
        event.preventDefault();
        const credentials = { username: this.state.username, password: this.state.password };

        this.setState({ loading: true, error: '' })
        axios
            .post('https://salty-tundra-21950.herokuapp.com/api/login', credentials)
            .then(response => {
                this.setState({ loading: false })
                localStorage.setItem('token', response.data.key);
                this.props.history.push('/');
            })
            .catch(err => this.setState({ loading: false }));
    }

    render() {
        return (
            <LoginContainer>

                <MainHeaderContainer>
                    <MainHeader>Login Screen</MainHeader>
                </MainHeaderContainer>

                <LoginFormContainer>

                    <LoginForm onSubmit={this.login}>
                        <LoginInput onChange={this.handleInput} placeholder='Login' value={this.state.username} name='username' type='text' />
                        <LoginInput onChange={this.handleInput} placeholder='Password' value={this.state.password} name='password' type='password' />
                        <LoginButton
                            type='submit'>
                            {this.state.loading ? <i className="fa fa-spinner fa-spin"></i> : 'Connect'}
                        </LoginButton>
                    </LoginForm>

                </LoginFormContainer>

            </LoginContainer >
        );
    }
}

export default Login;