import React from 'react';
import { createUser } from './../actions';
import { connect } from 'react-redux';
import {GameBox, 
    Container, 
    Banner, 
    Title,  
    CommandPrompt, 
    FormContainer, 
    Button} from '../Styles';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: ''
        }
    }

//sets username and password to state
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

//submits credentials to server via actions
    handleSubmit = event => {
        event.preventDefault();
        const user = this.state;
        this.props.createUser(user, this.props.history);
        this.setState({username: '', password1: '', password2: ''})

    }

    render() {
        return (
            <Container>
            <GameBox>
                <Banner>
                    <Title>Sign up</Title>
                </Banner>
                <FormContainer register onSubmit={this.handleSubmit}>
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
                        name='password1'
                        placeholder='password'
                        value={this.state.password1}
                        onChange={this.handleChange}
                    />
                    <CommandPrompt
                        type='password'
                        name='password2'
                        placeholder='confirm password'
                        value={this.state.password2}
                        onChange={this.handleChange}
                    />
                    <Button>Register</Button>
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
    createUser: createUser,
  }
  export default connect( mapStateToProps, mapActionsToProps)(Register);