import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import './registration.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        const userInfo = { username: this.state.username, password: this.state.password };
        console.log(userInfo)
        axios
            .post('https://adventure-mud.herokuapp.com/api/login', { username: this.state.username, password: this.state.password })
            .then(r => {
                console.log('r.data.key: ', r.data.key)
                localStorage.setItem('token', r.data.key);
                this.props.history.push('/api/adv/init')
            })
            .catch(err => console.log(err.response))
    }

    render() {
        return (
            <Form className='wrapper'>
                <h1 className='header'>Login</h1>
                <FormGroup>
                    <Input type="text" name="username" value={this.state.username} id="exampleUsername" placeholder="Username" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" value={this.state.password} className="examplePassword" placeholder="password" onChange={this.handleChange} />
                </FormGroup>
                <Button onClick={(e) => this.handleSubmit(e)} >Connect</Button>
            </Form>
        );
    }
}

export default Login;