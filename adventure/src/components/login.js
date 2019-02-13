import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

 const url = 'https://adventuregame-app.herokuapp.com'

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
            password: this.state.password1 };
      
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
          this.props.history.push('/game')
      }
    render() {
        return(
            <div className = "login">
                <h1>Enter Your Player Info</h1><br />
                <input onChange={this.handleChange}
                    name='username' type='text'
                    placeholder='Username'/><br />
                <input onChange={this.handleChange}
                    name='password1' type='password'
                    placeholder='Password'/><br />
                <button onClick={this.submitInfo}>Submit</button>
                <div>
                        <h4>No Player? Create One!</h4>
                        <Link to = {`/registration`}>
                            <button>Create Player</button>
                        </Link>
                    </div>
            </div>
        )
    }
}
 export default Login;