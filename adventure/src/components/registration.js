import React from 'react';
import axios from 'axios';

 const url = 'https://adventuregame-app.herokuapp.com/admin/'


 class Registration extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password1: '',
            password2: '',
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    submitInfo = e => {
        e.preventDefault();
        const { username, password1, password2 } = this.state;
        if (password1 !== password2){
            alert('Please input correct password.')
        } else {
            axios.post(`${url}/api/registration`, this.state)
                .then( res => {
                    this.setState({username:'', password1:'', password2:''});
                })
                .catch(err => console.log(err.message));
        }
    }
    render(){
        return(
            <div>
                <h1>Register New User</h1><br />
                <input onChange={this.handleChange}
                    name='username' type='text'
                    placeholder='Username'/><br />
                <input onChange={this.handleChange}
                    name='password1' type='password'
                    placeholder='Password'/><br />
                <input onChange={this.handleChange}
                    name='password2'
                    type='password'
                    placeholder='Confirm password'/><br />
                <button onClick={this.submitInfo}>Submit</button>
            </div>
        )
    }
}
 export default Registration;