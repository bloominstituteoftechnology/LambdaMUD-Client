import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        console.log('props in register', props)

        this.state = {
            username: '',
            password1: '',
            password2: ''
        };
        console.log('state', this.state)
    }

    handleUser = event => {
        this.setState({
            username: event.target.value,
        })
    }

    handlePassword1 = event => {
        this.setState({
            password1: event.target.value
        })
    }

    handlePassword2 = event => {
        this.setState({
            password2: event.target.value
        })
    }

    handleRegister = event => {
        event.preventDefault()
      
        const creds = { 
          username: this.state.username, 
          password1: this.state.password1, 
          password2: this.state.password1,
        }
      
        axios
          .post('https://baldwin-adv-project.herokuapp.com/api/registration', creds)
          .then(response => {
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
        return (
            <div className = "register">
                <h3>Please sign up!</h3>
                <form onSubmit = {this.handleRegister}>
                    <input type = "text"
                    value = {this.state.username}
                    name = 'username'
                    placeholder = "Username"
                    onChange = {this.handleUser}
                    />
                    <input type = "password"
                    value = {this.state.password1}
                    name = 'password'
                    placeholder = "Password"
                    onChange = {this.handlePassword1}
                    />
                    <input type = "password"
                    value = {this.state.password2}
                    name = 'password_check'
                    placeholder = "Re-enter Password"
                    onChange = {this.handlePassword2}
                    />
                    <button onClick={this.handleRegister}>Submit</button>
                </form>
            </div>

        )
    }
}

export default Register;