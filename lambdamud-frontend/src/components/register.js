import React, { Component } from 'react';
import axios from 'axios';

class register extends Component {
    // register requiures a password2

    state = {
        username: '',
        password1: '',
        password2: ''
    }

    // follow steps used in login, add a handleinputchange an onsubmit, a form to render
    // and a axios call to heroku post via register endpoint with a destructured packet to send through a promise

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const playerCreds = { username: this.state.username, password1: this.state.password1, password2: this.state.password2 }
        axios.post('https://lambda-mud-alexis-app.herokuapp.com/api/registration/', playerCreds)
            .then((response) => {
                console.log(response)
                localStorage.setItem('token', response.data.key)
                this.props.history.push('/login');
            })

        this.setState({ username: '', password1: '', password2: '' })
    }


    render() {
        return (
            <div className="App">
            <form>
                <label>username</label>
                <input value={this.state.username} placeholder='username' onChange={this.handleInputChange} name='username' />
                <label>password</label>
                <input value={this.state.password1} placeholder='password' onChange={this.handleInputChange} name='password1' type='password' />
                <label>re-type your password</label>
                <input value={this.state.password2} placeholder='confirm password' onChange={this.handleInputChange} name='password2' type='password' />
                <button className='reg-button' onClick={this.handleSubmit} >Register!</button>
            </form>
          </div>
        );
    }
}

export default register;