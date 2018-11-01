import React, { Component } from 'react'
import styled from 'styled-components'
import AuthForm from './authForm.js';

export default class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            register: false,
            failed: false, 
        }
    }

    toggle = (e) => {
        if(e.target.name === "register"){
            this.setState({
                register: true
            })
        } else {
            this.setState({
                register: false
            })
        }
    }

    failedAttempt = (errorMessage) => {
        this.setState({failed:true, err: errorMessage})
    }

    render(){
        return (
            <AuthDiv>
                <h1>MUD</h1>
                <div className="auth-box">
                    <div className='buttons'>
                        <button onClick={this.toggle} name='login' style={{'fontSize': this.state.register ? '12px': '18px'}}>login</button>
                        <button onClick={this.toggle} name='register' style={{'fontSize': this.state.register ? '18px': '12px'}}>register</button>
                    </div>
                    <AuthForm failedAttempt={this.failedAttempt} props={this.props} register={this.state.register ? true : false} />
                </div>
                {this.state.failed ? <p>{this.state.err}</p> : null}
            </AuthDiv>
        )
    }
}

const AuthDiv = styled.div`
    background: black;
    color: green;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .auth-box{
        border: 1px solid green;
        .buttons{
                background: green;
            button{
                background: green;
                padding: 5px;
                border: none;
                margin: 0;
                &:hover{
                    background: black;
                    color: green;
                }
                &:focus{
                    outline: none;
                }
            }
        }
    }
`;