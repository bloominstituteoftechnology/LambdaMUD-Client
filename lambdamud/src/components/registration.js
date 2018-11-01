import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {AuthForm} from './AuthComponents';
//file creates a registration form for user to register through makes an api call to server to process credentials to see if they are valid, if valid creates new user//
class RegisterForm extends React.Component{
    constructor(){
        super();
        this.state={
            username:'',
            password1:'',
            password2:''
        }
    }
    componentDidMount(){
        //when component mounts localStorage savedPage variable is updated to be /signup//
        localStorage.setItem('savedPage','/signup')
    }
    onChangeHandler=(e)=>{
        //when the value of an input field changes the corresponding state variable with the same name as the input field is also updated takes in event object as a parameter//
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmitHandler=(e)=>{
        /*takes in event object as a parameter, when user clicks the Create New User button if certain criteria are met for the username,password1, and password 2 fields
        then a newUserObj is created and sent to the /api/registration route of the server if this request is successful the return token value will be saved to localStorage in the token variable then user is redirected to the main route which contains the game*/
        e.preventDefault();
        if (this.state.username.length<4){
            alert('Username must be at least 4 characters long.');
        } else if (this.state.password1.length<6) {
            alert('Password must be at least 6 characters long.')
        } else if (this.state.password1 !== this.state.password2) {
            alert('Passwords do not match.')
        } else {
            const newUserObj={
                username: this.state.username,
                password1: this.state.password1,
                password2: this.state.password2
            }
            axios.post('https://new-school-mud.herokuapp.com/api/registration/',newUserObj)
                .then(res=>{
                    localStorage.setItem('token',res.data.key);
                    this.props.history.push('/main');
                })
                .catch(err=>alert('That username is already in use.'))
            }
        }
    redirect=()=>{
        //redirects user to /login route//
        this.props.history.push('/login');
    }
    render(){
        //renders registration view//
        return(
            <AuthForm onSubmit={this.onSubmitHandler}>
                <h2>Sign Up</h2>
                <input onChange={this.onChangeHandler} type='text' name='username' value={this.state.username} placeholder='Enter username.'/>
                <input onChange={this.onChangeHandler} type='password' name='password1' value={this.state.password} placeholder='Enter password.'/>
                <input onChange={this.onChangeHandler} type='password' name='password2' value={this.state.password} placeholder='Enter password again.'/>
                <button type='submit'>Create New User</button>
                <button type='button' onClick={this.redirect}>Have an account?</button>
            </AuthForm>
        )
    }
}
export default withRouter(RegisterForm);