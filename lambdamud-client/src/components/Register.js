// Register.js
// provides a way for a user to sign up for an account with the Django server

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        // Intializes state for username, two password fields, 
        // input type and show/hide boolean for those fields
        this.state = {
            username: '',
            password1: '',
            password2: '',
            password1Tag: 'Show',
            password2Tag: 'Show',
            password1State: 'password',
            password2State: 'password'
        }
    }

    // Sets state for username and password fields
    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    // Toggles the text and input type of the first password field to show or hide
    password1Toggle = () => {
        this.state.password1Tag === 'Show' ? this.setState({password1Tag: 'Hide'}) : this.setState({password1Tag: 'Show'})
        this.state.password1State === 'password' ? this.setState({password1State: 'text'}) : this.setState({password1State: 'password'})
    }

    // Toggles the text and input type of the second password field to show or hide
    password2Toggle = () => {
        this.state.password2Tag === 'Show' ? this.setState({password2Tag: 'Hide'}) : this.setState({password2Tag: 'Show'})
        this.state.password2State === 'password' ? this.setState({password2State: 'text'}) : this.setState({password2State: 'password'})
    }

    // Submits the registration form if the passwords match
    submitRegister = (event) => {
        event.preventDefault();
        if (this.state.password1 === this.state.password2) {
            axios.post('https://lambdamud-ghr.herokuapp.com/api/registration/', {
                username: this.state.username, 
                password1: this.state.password1, 
                password2: this.state.password2
            })
            // Calls the App.js login function
            .then(response => {
                console.log(response.data)
                this.props.login(response.data.key, this.state.username)
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response.data.error)
            })
            // Moves to the game component
            this.props.history.push('/');
        } else {
            // Pops up alert if passwords do not match
            alert('The passwords do not match.')
        }
    }

    render() {
        return (
            <div className="registerBody">
                
                <h1>Please register</h1>
                {/* Form with fields for username and two password entries */}
                <form onSubmit={this.submitRegister} className="registerForm">
                    <div>
                        <p>Username</p>
                        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler}></input>
                    </div>
                    <div>
                        <p>Password</p>
                        <input type={this.state.password1State} name="password1" placeholder="Password" value={this.state.password1} onChange={this.changeHandler}></input>
                        <button onClick={this.password1Toggle} type="button">{this.state.password1Tag}</button>
                    </div>
                    <div>
                        <p>Password, again</p>
                        <input type={this.state.password2State} name="password2" placeholder="Password again" value={this.state.password2} onChange={this.changeHandler}></input>
                        <button onClick={this.password2Toggle} type="button">{this.state.password2Tag}</button>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <h1>Log in instead</h1>
                <Link to="/login">Log in</Link>
            </div>
        )

    }
    
}

export default Register;