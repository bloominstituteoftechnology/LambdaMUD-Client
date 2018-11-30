import React, { Component } from 'react';
import axios from 'axios';

/* 
create a this.state with username and password for login
also, create class login component
*/

class login extends Component {
    state = {
        username: '',
        password: ''
    }
    
    /*
    need to handle change everytime a button is pressed so it doesn't refresh the DOM
    as well as update the state via keypress
     */
    
     handleInputChange = e => {
         this.setState({ [e.target.name]: e.target.value })
     }



     /*
     handlesubmit handles log in on click
      */
      handleSubmit = e => {
        e.preventDefault()

        // do we want to destructure?
        const playerCreds = { username: this.state.username, password: this.state.password}

        // make the axios post call to heroku login
        axios.post('https://lambda-mud-alexis-app.herokuapp.com/api/login', playerCreds)
            .then((response) => {
                // it will give us back a token called key (in postman returns a value called key)
                localStorage.setItem('token', response.data.key)
                this.props.history.push('/');
            })
        // reset username and password on successful login
        this.setState({ username: '', password: '' })
      }



      // set up how login page will look, then call event handlers here

      render() {
          return (
              <div className="App">
                <form>
                    <label>username</label>
                    <input value={this.state.username} placeholder='username' onChange={this.handleInputChange} name='username' />
                    <label>Password</label>
                    <input value={this.state.password} placeholder='password' onChange={this.handleInputChange} name='password' type='password' />
                    <button type='button' onClick={this.handleSubmit} >Login</button>
                </form>
              </div>
          );
      }
}



export default login;
