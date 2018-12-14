import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from "../components/Authentication/Register";
import { getUser, registerUser, clearError } from '../store/actions';

/**
 * Handles the Registration information to be sent to the actions/reducers
 */
class RegisterView extends Component {
    state = {
        user: {
            email: '',
            username: '',
            password: '',
            password2: '',
        },
        error: '',
    };

    /**
     * Handles the input and sets state accordingly to display error message or not
     * @param e
     */
    handleChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value,
            }
        }, () => {
            // If the passwords do not match
            if(this.state.user.password !== this.state.user.password2) {
                this.setState({ error: 'Passwords do not match'})
                // If we don't have 8 or more chars
            } else if (this.state.user.password.length <= 7 || this.state.user.password2.length <= 7) {
                this.setState({ error: 'Passwords must be at least 8 characters'})
                // If we don't have a valid email address
            } else if(!this.validateEmail(this.state.user.email)) {
                this.setState({error: 'Invalid email address.'});
            } else {
                this.setState({
                    error: ''
                });
            }
        });
    }

    // Uses Regex to determine if the email given is valid or not
    validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    // Register the user
    userRegister = e => {
        // Validates the email again
        if(!this.validateEmail(this.state.user.email)) {
            this.setState({error: 'Invalid email address.'});
            return;
        }

        // Validates the password length again
        if (this.state.user.password.length <= 7 || this.state.user.password2.length <= 7) {
            this.setState({ error: 'Passwords must be at least 8 characters'})
            return;
        }

        // Validates if the two passwords do not match again
        if(this.state.user.password !== this.state.user.password2) {
            this.setState(({error: 'Passwords do not match'}))
            return;
        }

        // Clear all error messages
        this.props.clearError();

        this.setState({
            error: ''
        });

        // Setup a new user
        const newUser = {
            username: this.state.user.username,
            email: this.state.user.email.toLowerCase(),
            password1: this.state.user.password,
            password2: this.state.user.password2,
        }

        // Register the new user
        this.props.registerUser(newUser);
    };

    // Render the component
    render() {
        return (
            <Register
                {...this.props}
                user={this.state.user}
                error={this.state.error}
                localError={this.props.error}
                isLoggedIn={this.props.isLoggedIn}
                handleChange={this.handleChange}
                userRegister={this.userRegister}
            />
        );
    };
};

// Setup props
const mapStateToProps = state => ({
    error: state.error,
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps, { getUser, registerUser, clearError })(RegisterView);