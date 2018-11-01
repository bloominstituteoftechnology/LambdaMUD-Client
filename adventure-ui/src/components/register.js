import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        console.log('props in register', props)

        this.state = {
            username: '',
            password1: '',
            password2: '',
        };
        console.log('state', this.state)
    }

 handleChange = event => {
     this.setState({ [event.target.name]: event.target.value});
 }

//--------------- register ----------------
handleRegister = event => {
    event.preventDefault()
  
    const creds = { 
      username: this.state.username, 
      password1: this.state.password1, 
      password2: this.state.password1,
    };

    axios
          .post('https://baldwin-adv-project.herokuapp.com/api/registration', creds)
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
      }


    render() {
        return (
            <div className = "register">
                <h3>Please sign up!</h3>
                <form onSubmit = {this.handleRegister}>
                    <input type = "text"
                    onChange = {this.handleChange}
                    value = {this.state.username}
                    name = 'username'
                    placeholder = "Username"
                    />
                    <input type = "password"
                    value = {this.state.password1}
                    name = 'password1'
                    placeholder = "Password"
                    onChange = {this.handleChange}
                    />
                    <input type = "password"
                    value = {this.state.password2}
                    name = 'password2'
                    placeholder = "Re-enter Password"
                    onChange = {this.handleChange}
                    />
                    <button>Submit</button>
                </form>
            </div>

        )
    }
}

export default Register;