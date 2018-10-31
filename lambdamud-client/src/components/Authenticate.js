// Authenticate.js
// Provides a login function that displays if the user is not logged in.

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Pass in an app
const Authenticate = App => 
    class extends React.Component {
        constructor(props) {
            super(props);
            // Initializes state for username, password, field type of password, and text of password show/hide button
            this.state = {
                username: '',
                password: '',
                passwordState: 'password',
                passwordTag: 'Show'
            }
        }

        // Sets state for username and password fields
        changeHandler = (event) => {
            this.setState({[event.target.name]: event.target.value})
        }

        // Toggles the text and input type of the password field to show or hide
        passwordToggle = () => {
            this.state.passwordTag === 'Show' ? this.setState({passwordTag: 'Hide'}) : this.setState({passwordTag: 'Show'})
            this.state.passwordState === 'password' ? this.setState({passwordState: 'text'}) : this.setState({passwordState: 'password'})
        }

        // Logs in with the credentials provided to the Django server
        handleLogin = (event) => {
            event.preventDefault();
            axios.post('https://lambdamud-ghr.herokuapp.com/api/login/', {
                username: this.state.username,
                password: this.state.password
            })
            // Calls passed-in login function from App.js
            .then(response => {
                this.props.login(response.data.key, this.state.username)
                if (response.data.key) {
                    // Moves page to game component
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response.data.error)
            })
        }

        render() {
            return (
                <div className="loginBody">
                    
                    <h1>Please log in</h1>
                    {/* Form for inputting username and password */}
                    <form onSubmit={this.handleLogin} className="loginForm">
                        <div>
                            Username
                            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                        </div>
                        <div>
                            Password
                            <input type={this.state.passwordState} name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
                            <button type="button" onClick={this.passwordToggle}>{this.state.passwordTag}</button>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                    <h1>Register instead</h1>
                    <Link to="/register">Register</Link>
                </div>
            )
        }
    }

export default Authenticate;