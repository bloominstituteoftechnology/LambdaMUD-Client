import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'

const Form = styled.form`
    color: #457B9D;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(45,45,45,0.2);
    justify-content: space-around;
    align-items: center;
    width: 400px;
    height: 400px;
    margin: 100px auto;
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
    padding: 0 50px;
    font-family: 'Lora', Serif;
    font-Size: 14px;
    background: rgba(240, 240, 240, .8);
`

const Heading = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(45,45,45,0.1);
    padding-bottom: 10px;
`

const Header = styled.h3`
    font-family: 'Roboto', Sans-Serif;
    font-size: 48px;
    text-align: left;
    margin: 0;
    font-weight: bold
`

const SubHeader = styled.p`
    margin: 0;
    text-align: left;
    font-weight: bold;
`

const Button = styled.button`
    box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.20);
    width: 150px;
    background: #457B9D;
    color: #F1FAEE;
    border: none;
    width: 250px;
    height: 50px;
    font-size: 24px;
    cursor: pointer;
    &:hover {
        background: #1D3557;
    }

    &:active {
        box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.50);
        transform: translateY(2px);
    }
`

const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid rgba(45,45,45,0.2);
    &::placeholder {
        color: #457B9D;
    }
    background: rgba(255,255,255,0);
`

const Warning = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #E63946;
    margin: auto;
    transition-delay: 0.5s;
    font-family: 'Lora', Serif;
`

const Text = styled.p`
    font-size: 14px;
    color: rgba(45,45,45,.9)
`

const StyledLink = styled(Link)`
    text-decoration: none;
    &:visited {
        color: #457B9D;
    }
    &:hover {
        color: #003459;
        font-weight: bold;
    }
    
`

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: "",
                password: "",
                token: ""
            },
            response: {
                status: 201,
                content: {}
            }
        }
    }

    changeHandler = (e) => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        });
    }

    submitHandler = async (e, user) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://lambda-mud-proj.herokuapp.com/api/registration', user);
            const key = response.data.key;
            this.setState({
                user: {
                    ...this.state.user,
                    token: key
                }
            });
        } catch (error) {
            const err = {
                status: error.response.status,
                content: error.response.data
            }
            this.setState({
                user: {
                    username: "",
                    password: "",
                    token: "",
                },
                response: err
            });
        }
    }

    render() {
        const signupLink = <StyledLink to='/registration'>Sign up</StyledLink>
        const warning = this.state.response.status < 400 ? null
            : <Warning>
                {this.state.response.content.error}
            </Warning>;
        return (
            <div>
                <Form onSubmit={(e) => this.submitHandler(e, this.state.user)}>
                    <Heading>
                        <Header>Welcome</Header>
                        <SubHeader>Sign in to your account</SubHeader>
                    </Heading>

                    <Input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={this.state.username}
                        required
                        onChange={this.changeHandler}
                    />

                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={this.state.password1}
                        required
                        onChange={this.changeHandler}
                    />

                    <div>
                        <Button type="submit">Sign In</Button>
                        <Text>Don't have an account? {signupLink}</Text>
                    </div>
                </Form>
                {warning}
            </div>
        );
    }
}

export default LoginForm;