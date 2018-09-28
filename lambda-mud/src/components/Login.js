import React from 'react';
import { loginUser } from './../actions/index';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {GameBox, 
    Container, 
    Banner, 
    Title, 
    CommandPrompt, 
    FormContainer, 
    Button} from '../Styles';



class Login extends React.Component{
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

//sets username and password to state
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

//submits credentials to server via actions
    submitLogin = (event) => {
        event.preventDefault();
        const user = this.state;
        this.props.loginUser(user, this.props.history);
        this.setState({username: '', password: ''})
    }


    render() {
        return (
            <Container>
            <GameBox>
                <Banner>
                <Title>Join Game</Title>
                </Banner>
                <FormContainer onSubmit={this.submitLogin}>
                    <CommandPrompt
                        type='text'
                        name='username'
                        placeholder='username'
                        autoComplete='off'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <CommandPrompt
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <Button onClick={this.submitLogin}>Log in</Button>
                </FormContainer>
            </GameBox>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
      users: state.users
    }
  }
  
  const mapActionsToProps = {
    loginUser: loginUser,
  }

//added withRouter so that page redirects upon login
  Login = withRouter(Login);
  export default connect(mapStateToProps, mapActionsToProps)(Login);