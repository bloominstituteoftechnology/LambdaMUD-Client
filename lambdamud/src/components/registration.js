import React from 'react';
import axios from 'axios';

class RegisterForm extends React.Component{
    constructor(){
        super();
        this.state={
            username:'',
            password1:'',
            password2:''
        }
    }
    onChangeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmitHandler=(e)=>{
        e.preventDefault();
        const newUserObj={
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2
        }
        axios.post('https://new-school-mud.herokuapp.com/api/registration/',newUserObj)
            .then(res=>localStorage.setItem('token',res.data.key))
            .catch(err=>console.log(err))
    }
    render(){
        return(
            <form onSubmit={this.onSubmitHandler}>
                <input onChange={this.onChangeHandler} type='text' name='username' value={this.state.username} placeholder='Enter username.'/>
                <input onChange={this.onChangeHandler} type='password' name='password1' value={this.state.password} placeholder='Enter password.'/>
                <input onChange={this.onChangeHandler} type='password' name='password2' value={this.state.password} placeholder='Enter password.'/>
                <button type='submit'>Create New User</button>
            </form>
        )
    }
}
export default RegisterForm;