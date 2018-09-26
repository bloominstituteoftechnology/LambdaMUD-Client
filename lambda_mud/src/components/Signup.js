import React, { Component } from 'react';
import styled from 'styled-components'
import { withRouter } from 'react-router'

const Login = styled.div`
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

class Signup extends Component {
    state = {
        userName: '',
        password1: '',
        password2: '',
        signUpUrl: 'https://lambda-mud-game.herokuapp.com/api/registration/',
        error: ''
    }

    inputHandler = (e) => {
        // Handle the input change
        this.setState({ [e.target.name]: e.target.value, error: '' })
    }

    submitHandler = (e) => {
        e.preventDefault()
        
        let user = { username: this.state.userName, password1: this.state.password1, password2: this.state.password2 }
        this.setState({userName: '', password1: '', 'password2': '', error: ''})
        this.props.handleSignin(user, this.state.signUpUrl)
    }

    render() {
    return (
        <Login className="Signin">
            <h1>Create New UserName and Password</h1>
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
                            name="password1"
                            placeholder="Password"
                            value={this.state.password1} 
                            onChange={this.inputHandler} />
                </div>
                <div>
                    <Input type="password" 
                            name="password2"
                            placeholder="Re-enter password"
                            value={this.state.password2} 
                            onChange={this.inputHandler} />
                </div>
                <div>
                    <button type="submit">Signin</button>
                </div>
                {this.state.error ? (
                    <Error>{this.state.error}</Error>
                 ) : null}
            </form>
        </Login>
    );
  }
}

export default withRouter(Signup);
