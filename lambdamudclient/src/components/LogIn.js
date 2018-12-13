import React from 'react';
import {MainBox, TitleBox, Title, ContentBox, InputBox, PasswordBox, Button} from './style.js';
import {login} from '../redux/actions.js';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class LogIn extends React.Component{
    state = {
        login: '',
        password: ''
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    login = event => {
        event.preventDefault();
        const credentials = {
            username: this.state.login,
            password: this.state.password
        }
        this.setState({login:'', password:''});
        this.props.login(credentials);
    }

    render(){
        if(this.props.loggedin){
            return <Redirect to='/' />
        }else{
            return(
                <MainBox>
                    <TitleBox>
                        <Title>
                            Login Screen
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
                            placeholder='password'
                            value={this.state.password}
                            name='password'
                            onChange={this.handleChange}
                        />
                        <Button onClick={this.login}>
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

export default connect(mapStateToProps, {login})(LogIn);