import React from 'react';
import axios from 'axios';

class LoginForm extends React.Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:''
        }
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
            .then(res=>localStorage.setItem('token',res.data.key))
            .catch(err=>console.log(err))
    }
    render(){
        return(
            <form onSubmit={this.onSubmitHandler}>
                <input onChange={this.onChangeHandler} type='text' name='username' value={this.state.username} placeholder='Enter username.'/>
                <input onChange={this.onChangeHandler} type='password' name='password' value={this.state.password} placeholder='Enter password.'/>
                <button type='submit'>Log In</button>
            </form>
        )
    }
}
export default LoginForm;