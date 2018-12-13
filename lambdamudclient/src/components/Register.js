import React from 'react';
import {MainBox, TitleBox, Title, ContentBox, InputBox, PasswordBox, Button} from './style.js';
import {register} from '../redux/actions.js';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Register extends React.Component{
    state = {
        login: '',
        password1: '',
        password2: ''
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    }

    register = event => {
        event.preventDefault();
        const registration = {
            username: this.state.login,
            password1: this.state.password1,
            password2: this.state.password2
        }
        this.setState({login:'',password1:'',password2:''});
        this.props.register(registration);
    }

    render(){
        if(this.props.loggedin){
            return <Redirect to='/' />
        }else{
            return(
                <MainBox>
                    <TitleBox>
                        <Title>
                            Create Account Screen
                        </Title>
                    </TitleBox>
                    <ContentBox>
                        <InputBox
                            type='text'
                            placeholder='Login'
                            value={this.state.login}
                            name='login'
                            onChange={this.handleChange}
                            />
                        <PasswordBox
                            type='password'
                            placeholder='Password'
                            value={this.state.password1}
                            name='password1'
                            onChange={this.handleChange}
                            />
                        <PasswordBox
                            type='password'
                            placeholder='Password again'
                            value={this.state.password2}
                            name='password2'
                            onChange={this.handleChange}
                        />
                        <Button onClick={this.register}>
                            Connect
                        </Button>
                    </ContentBox>
                </MainBox>
            )
        }
    }
}

const mapStateToProps = state => ({
    loggedin: state.loggedin
});

export default connect(mapStateToProps, {register})(Register);