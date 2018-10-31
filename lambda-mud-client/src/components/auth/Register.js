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

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    submitHandler = e => {
        e.preventDefault();
        axios
        .post('https://enigmatic-brook-88093.herokuapp.com/api/registration', this.state)
        .then(res => {
            console.log('response', res)
            const token = res.data['key'];
            localStorage.setItem('token', `Token ${token}`);
            window.location.href = 'http://localhost:3000/adventure';
        })
        .catch(err => {
            console.log('Axios error:', err);
        });
    }

  render() {
    return (
        <div>
            <Paper zDepth={2} style={styles.form}>
                <form className="form-div" onSubmit={this.submitHandler}>
                    <TextField
                    style={styles.input}
                    underlineShow={false}
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
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
                    type="password"
                    hintText="Re-enter Password"
                    name="password2"
                    />
                    <Divider />
                    <RaisedButton type="submit" label="Create Account" style={styles.button} />
                </form>
            </Paper>
        </div>
    );
  }

}

export default Register;
