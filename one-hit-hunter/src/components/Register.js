import React from 'react'
import axios from 'axios'

class Register extends React.Component {
  state = {    
    username: '',    
    password1: '',  
    password2: '',       
  }

  /* Handle the onChange in your form */
  handleChange = e => {
    console.log([e.target.name],':', e.target.value)    
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();    
    // --> Handle the double password confirmation
    if (this.state.password1 !== this.state.password2) {
      alert("Error: Passwords do not match")
    } else if (this.state.password1.length < 10) {
      alert("Error: Password length too small, 10 characters or more")
    }

    const userObject = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2
    }

    axios.post('https://one-hit-hunter.herokuapp.com/api/registration/', userObject)
      .then(response => {
        console.log(response)
        localStorage.setItem('token', response.data.key)           
      })
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <div className = 'register-form'>
        <form onSubmit = {this.handleSubmit}>
          <input
            name = 'username'
            type = 'text'
            onChange = {this.handleChange}
            placeholder = 'username'
            value = {this.state.username}
          />
          <input
            name = 'password1'
            type = 'text'
            onChange = {this.handleChange}
            placeholder = 'password'
            value = {this.state.password1}            
          />   
          <input
            name = 'password2'
            type = 'text'
            onChange = {this.handleChange}
            placeholder = 'confirm password'
            value = {this.state.password2}            
          />          
          <button type = 'submit' onClick = {this.handleSubmit}>Let's get Hunting</button>
        </form>
      </div>
    )
  }
}

export default Register