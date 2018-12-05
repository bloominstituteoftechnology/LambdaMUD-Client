import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import {
    Col, Form,
    FormGroup, Label, Input,
    Button,
    FormText,
  } from 'reactstrap';

class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const user = this.state
        
        fetch("https://lambdamud--bhavik.herokuapp.com/api/login/", {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => {
                response.json()
            })
            .then(response => {
		        localStorage.setItem('token', response.key)
                this.props.history.push('/play')
            })
		this.setState({ username: "", password: "" })
    }

    render() {
        return (
            <Fragment>
                <h2>LogIn</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Col>
                        <FormGroup row>
                            <Label for="username" sm={2}>Username</Label>
                            <Col sm={10}>
                                <Input
                                    name="username"
                                    id="username"
                                    type="text"
                                    placeholder="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <FormText>Username must be 6 to 11 characters long.</FormText>
                            </Col>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input
                                    name="password"
                                    id="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />        
                                <FormText>Password must be 8 to 11 characters long.</FormText>
                            </Col>
                        </FormGroup>
                    </Col>

                    <Col>
                        <Button>LogIn</Button>
                    </Col>                
                </Form>
            </Fragment>
        )
    }
}

export default withRouter(LogIn)