import React , { Component } from 'react'
import styled from 'styled-components'

export default class AuthForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            password2: '',
        }
    }

    inputHandler = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sendCreds = (e) => {
        e.preventDefault();
        

    }

    render(){
        return(
            <AuthFormDiv> 
                <form>
                    <input onChange={this.inputHandler} name="username" value={this.state.username} type="text">{this.value}</input>
                    <input onChange={this.inputHandler} name="password" value={this.state.password} type="text">{this.value}</input>
                    <input onChange={this.inputHandler} name="password2" value={this.state.password2} type="text">{this.value}</input>
                </form>
            </AuthFormDiv>
        )
    }
}

const AuthFormDiv = styled.div`
    border: 1px solid red;
`