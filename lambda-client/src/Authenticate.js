import React from 'react';
// import Login from './Login';
import axios from 'axios';
import {Button,Form,FormGroup,Input} from 'reactstrap';
class Authenticate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password1: "",
            password2: ""
        };
    }
    changeHandle = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    submitHandle = () => {
        const user = {username: this.state.username, password1: this.state.password1, password2: this.state.password2};

        axios.post('https://greb-lambdamud.herokuapp.com/api/registration/', user)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.key);
                
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
                        placeholder="password1"
                        name="password1"
                        value={this.state.password1}
                        onChange={this.changeHandle}
                        />
                        </FormGroup>
                        <FormGroup>
                    <Input
                        type="text"
                        placeholder="password2"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.changeHandle}
                        />
                        <br />
                        <Button onClick={this.submitHandle}>
                            Please Log In
                        </Button>
                </FormGroup>
            </Form>

        )

    }
};

export default Authenticate;