import React, { Component } from 'react'
import styled from 'styled-components'
import AuthForm from './authForm.js';

export default class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            register: false
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
    render(){
        return (
            <AuthDiv>
                <h1>MUD</h1>
                <div className="auth-box">
                    <div className='buttons'>
                        <button onClick={this.toggle} name='login' style={{'textDecoration': this.state.register ? 'none': 'underline'}}>login</button>
                        <button onClick={this.toggle} name='register' style={{'textDecoration': this.state.register ? 'underline': 'none'}}>register</button>
                    </div>
                    <AuthForm props={this.props} register={this.state.register ? true : false} />
                </div>
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
    justify-content: space-around;
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
            }
        }
    }
`;