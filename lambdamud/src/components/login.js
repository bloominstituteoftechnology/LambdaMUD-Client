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
        //when component mounts set the savedPage variable in localStorage to /login//
        localStorage.setItem('savedPage','/login')
    }
    onChangeHandler=(e)=>{
        //when value in an input field changes the state variable that corresponds to that input field's name also changes takes in event object as a parameter//
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmitHandler=(e)=>{
        //when login button is clicked, creates an userObj to be sent to the /api/login route of server an event object is passed in as a parameter if request is successful the token that is returned will be saved as a token variable in localStorage then user is redirected to game view.//
        e.preventDefault();
        const userObj={
            username: this.state.username,
            password: this.state.password
        }
        axios.post('https://new-school-mud.herokuapp.com/api/login/',userObj)
            .then(res=>{
                localStorage.setItem('token',res.data.key);
                this.props.history.push('/main');
            })
            .catch(err=>alert('Username and password do not match.'))
    }
    redirect=()=>{
        //redirects user to the signup route//
        this.props.history.push('/signup');
    }
    render(){
        //renders the login view//
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