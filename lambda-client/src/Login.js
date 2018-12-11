import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input } from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            
        };
    }
    changeHandle = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    submitHandle = () => {
        const user = this.state.username && this.state.password;

        axios.post('https://greb-lambdamud.herokuapp.com/api/login/', user)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Server Error', error);
            });
    }

    render() {
        return (
            <Form className="login-page">
                <h1>Please Log In</h1>
                <FormGroup>
                    <Input 
                        type="text"
                        placeholder="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.changeHandle}
                        />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="text"
                        placeholder="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.changeHandle}
                        />
                        <br />
                        <Button onClick={this.submitHandle}>
                            Please Log In
                        </Button>
                </FormGroup>
            </Form>
        );
    }
}

export default Login;