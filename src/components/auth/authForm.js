import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { withRouter } from 'react-router'

class AuthForm extends Component {
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
        let creds = {
            username: this.state.username,
            password: this.state.password,
        }
        if(this.props.register === true){
            creds.password2 = this.state.password2
            creds.password1 = this.state.password
            delete creds.password
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/registration`, creds).then(res => {
                localStorage.setItem('MUD', res.data.key)
                this.props.history.push('/game')
            }).catch(err => {
                this.props.failedAttempt(err.response.data.error);
            })
            this.setState({
                username: '',
                password: '',
                password2: '',
            })
        } else {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, creds).then(res => {
                localStorage.setItem('MUD', res.data.key)
                this.props.history.push('/game')
            }).catch(err => {
                this.props.failedAttempt(err.response.data.error);
            })
            this.setState({
                username: '',
                password: '',
            })
        }
    }

    render(){
        return(
            <AuthFormDiv> 
                <form onSubmit={this.sendCreds}>
                    <input autoFocus placeholder="enter: username" onChange={this.inputHandler} name="username" value={this.state.username} type="text">{this.value}</input>
                    <input placeholder="enter: password" onChange={this.inputHandler} name="password" value={this.state.password} type="password">{this.value}</input>
                    <input style={{visibility: this.props.register ? null : 'hidden'} } placeholder="enter: password2" onChange={this.inputHandler} name="password2" value={this.state.password2} type="password">{this.value}</input>
                    <input type="submit" />
                </form>
            </AuthFormDiv>
        )
    }
}

export default withRouter(AuthForm)

const AuthFormDiv = styled.div`
    form {
        margin: 5px;
        padding: 5px;
        display: flex;
        flex-direction: column;
        input {
            border: 1px solid red;
            margin: 2px;
            background: black;
            border: 0;
            color: #008000;
            padding: 2px;
            &::-webkit-input-placeholder{
                color: #00ff00;
            }
            &:hover{
                background-color: #008000;
                color: black;
            }
            &:focus{
                outline: 1px solid #008000;
            }
        }
    }
`