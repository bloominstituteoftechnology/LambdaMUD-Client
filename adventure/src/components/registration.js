import React from 'react';
import axios from 'axios';

 const url = 'https://adventuregame-app.herokuapp.com'

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
        e.preventDefault()
  
        const credentials = { 
          username: this.state.username, 
          password1: this.state.password1, 
          password2: this.state.password1,
        };
    console.log(credentials)
        axios
              .post(`${url}/api/registration`, credentials)
              .then(response => {
                  console.log(response)
                  console.log(this.state)
                localStorage.setItem('token', response.data.key);
                localStorage.setItem('username', this.state.username);
              })
              .catch(error => console.log(error));
          
              this.setState({
                username: '',
                password1: '',
                password2: '',
              })
              this.props.history.push('/login')
          }

    render(){
        return(
            <div className = "register">
                <h1>Create Your Player</h1><br />
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
                <button onClick={this.submitInfo}>Get Started</button>
            </div>
        )
    }
}
 export default Registration;