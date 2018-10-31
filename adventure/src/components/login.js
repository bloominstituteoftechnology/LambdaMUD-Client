import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

 const url = 'https://adventuregame-app.herokuapp.com/admin/'

 class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password1: '',
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    submitInfo = e => {
        e.preventDefault()
        const credentials = { 
            username: this.state.username, 
            password: this.state.password };
      
        axios
          .post(`${url}/api/login`, credentials)
          .then(response => {
            console.log(response)
            console.log(this.state)
            localStorage.setItem('token', response.data.key);
            localStorage.setItem('username', this.state.username);
          })
          .catch(error => console.log(error));
      
          this.setState({
            username: '',
            password: '',
          })
      }
    render() {
        return(
            <div>
                <h1>Login</h1><br />
                <input onChange={this.handleChange}
                    name='username' type='text'
                    placeholder='Username'/><br />
                <input onChange={this.handleChange}
                    name='password1' type='password'
                    placeholder='Password'/><br />
                <button onClick={this.submitInfo}>Submit</button>
                <div>
                        <h4>Not a member? Sign up!</h4>
                        <Link to = {`/registration`}>
                            <button>Register</button>
                        </Link>
                    </div>
            </div>
        )
    }
}
 export default Login;