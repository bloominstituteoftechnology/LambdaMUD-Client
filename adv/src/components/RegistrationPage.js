import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import './registration.css'

class RegistrationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })

    }

    handleSubmit = e => {
        // e.preventDefault();
        const userInfo = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 };
        console.log(userInfo)

        axios
            .post('https://adventure-mud.herokuapp.com/api/registration/', userInfo)
            .then(r => {
                console.log(r)
                localStorage.setItem('token', r.data.key);
                this.props.history.push('/api/adv/init')
            })
            .catch(err => console.log(err.response))
    }

    render() {
        return (
            <Form className='wrapper'>
                <h1 className='header'>Registration</h1>
                <FormGroup>
                    <Input type="text" name="username" value={this.state.username} id="exampleUsername" placeholder="Username" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password1" value={this.state.password1} className="examplePassword" placeholder="password" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password2" value={this.state.password2} className="examplePassword" placeholder="password again" onChange={this.handleChange} />
                </FormGroup>
                <Button onClick={() => this.handleSubmit()} >Connect</Button>

            </Form>
        );
    }
}

export default RegistrationPage;