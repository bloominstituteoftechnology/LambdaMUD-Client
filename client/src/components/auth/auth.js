import React, { Component } from 'react'
import styled from 'styled-components'
import AuthForm from './authForm.js';

export default class Auth extends Component {
    constructor(){
        super()
        this.state = {
            register: true
        }
    }
    render(){
        return (
            <AuthDiv>
                <div className="auth-box">
                    <button style={{'text-decoration': this.state.register ? 'none': 'underline'}}>login</button>
                    <button style={{'text-decoration': this.state.register ? 'underline': 'underline'}}>register</button>
                    <AuthForm register={this.state.register} />
                </div>

            </AuthDiv>
        )
    }
}

const AuthDiv = styled.div`
    background: black;
    color: green;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .auth-box{
        border: 1px solid green;
        button{
            background: green;
            border: none;
            margin: 0;
        }
    }
`;