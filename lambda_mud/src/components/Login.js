import React, { Component } from 'react';
import styled from 'styled-components'
import { withRouter } from 'react-router'


const LoginStyled = styled.div`
    display: flex
    flex-flow: column
    justify-content: center
    align-items: center
`
const Input = styled.input`
    margin: 0% 0 8% 0;
    width: 220px;
    box-shadow: 3px 4px 10px;
    height: 20px;
`
const Error = styled.div`
    color: red
`

class Login extends Component {
    state = {
        userName: '',
        password: '',
        logInUrl: 'https://lambda-mud-game.herokuapp.com/api/login/',
        error: ''
    }

    inputHandler = (e) => {
        // Handle the input change
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()

        let user = { username: this.state.userName, password: this.state.password }
        this.setState({userName: '', password: '', error: ''})
        this.props.handleSignin(user, this.state.logInUrl)
    }

    render() {
    return (
        <LoginStyled className="Login">
            <h1>Please Log In</h1>
            <form onSubmit={this.submitHandler}>
                <div> 
                    <Input type="text"
                            name="userName" 
                            placeholder="User Name"
                            value={this.state.userName} 
                            onChange={this.inputHandler} />
                </div>
                <div>
                    <Input type="password" 
                            name="password"
                            placeholder="Password"
                            value={this.state.password} 
                            onChange={this.inputHandler} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>

                {this.state.error ? (
                    <Error>{this.state.error}</Error>
                 ) : null}
            </form>
        </LoginStyled>
    );
  }
}

export default withRouter(Login);
