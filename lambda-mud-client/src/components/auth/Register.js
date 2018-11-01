// This file handles form input, styling, and axios calls for the registration page

import React, { Component } from 'react';
import axios from 'axios';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

const styles = {
    form: {
        width: '30%',
        margin: '50px auto auto',
        padding: '10px'
    },
    input: {
        marginLeft: 20,
    },
    button: {
        display: 'block',
        margin: '20px auto 10px',
        width: '50%',
    },
  };

class Register extends Component {
    state = {
        username: '',
        password1: '',
        password2: ''
    };
    // The inputChangeHandler updates state when information is entered into the input fields
    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    // The enterHandler calls the submitHandler if the enter key is pressed in an input field
    // I couldn't get onSubmit to work in this instance
    enterHandler = e => {
        if(e.keyCode === 13){
            this.submitHandler()
        }
    };
    // Makes an axios call to the server requesting to register a new user
    // Passes in the username and password from state
    // Returns a token which is saved to localStorage, then redirects to the main page
    submitHandler = () => {
        axios
        .post('https://enigmatic-brook-88093.herokuapp.com/api/registration', this.state)
        .then(res => {
            const token = res.data['key'];
            localStorage.setItem('token', `Token ${token}`);
            window.location.href = 'https://sharp-thompson-8fccb7.netlify.com/adventure';
        })
        .catch(err => {
            console.log('Axios error:', err);
        });
    }

  render() {
    return (
        <div>
            <Paper zDepth={2} style={styles.form}>
                    <TextField
                    style={styles.input}
                    underlineShow={false}
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    onKeyUp={this.enterHandler}
                    type="text"
                    hintText="Username"
                    name="username"
                    />
                    <Divider />
                    <TextField
                    style={styles.input}
                    underlineShow={false}
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    onKeyUp={this.enterHandler}
                    type="password"
                    hintText="Password"
                    name="password1"
                    />
                    <Divider />
                    <TextField
                    style={styles.input}
                    underlineShow={false}
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    onKeyUp={this.enterHandler}
                    type="password"
                    hintText="Re-enter Password"
                    name="password2"
                    />
                    <Divider />
                    <RaisedButton type="submit" label="Create Account" style={styles.button} />
            </Paper>
        </div>
    );
  }

}

export default Register;
