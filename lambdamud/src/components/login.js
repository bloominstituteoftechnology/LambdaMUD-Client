import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {AuthForm} from './AuthComponents'
//file creates login form for user makes an api call to server to process credentials once login button is clicked//
class LoginForm extends React.Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:''
        }
    }
    componentDidMount(){
        localStorage.setItem('savedPage','/login')
    }
    onChangeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmitHandler=(e)=>{
        e.preventDefault();
        const userObj={
            username: this.state.username,
            password: this.state.password
        }
        axios.post('https://new-school-mud.herokuapp.com/api/login/',userObj)
            .then(res=>{
                localStorage.setItem('token',res.data.key);
                console.log(res.data);
                this.props.history.push('/main');
            })
            .catch(err=>alert('Username and password do not match.'))
    }
    redirect=()=>{
        this.props.history.push('/signup');
    }
    render(){
        return(
            <AuthForm onSubmit={this.onSubmitHandler}>
                <h2>Log In</h2>
                <input onChange={this.onChangeHandler} type='text' name='username' value={this.state.username} placeholder='Enter username.'/>
                <input onChange={this.onChangeHandler} type='password' name='password' value={this.state.password} placeholder='Enter password.'/>
                <button type='submit'>Log In</button>
                <button type='button' onClick={this.redirect}>No account?</button>
            </AuthForm>
        )
    }
}
export default withRouter(LoginForm);