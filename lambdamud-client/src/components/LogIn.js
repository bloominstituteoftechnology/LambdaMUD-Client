import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import {
    Col, Form,
    FormGroup, Label, Input,
    Button,
    FormText,
  } from 'reactstrap';

// Login Component allows existing user to enter username, password and login.  
class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    // method to change input display on UI with user entered values
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const user = this.state
        
        // POST username, password to /api/login and if successful
        // set token in localStorage and redirect user to play game
        // fetch("https://lambdamud--bhavik.herokuapp.com/api/login/", {
        fetch("http://localhost:8000/api/login/", {    
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json() )
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