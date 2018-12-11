import React, { Component } from 'react';
import { connect } from 'react-redux';
import Register from "../components/Authentication/Register";
import { getUser, registerUser, clearError } from '../store/actions';

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

    handleChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value,
            }
        }, () => {
            if(this.state.user.password !== this.state.user.password2) {
                this.setState({ error: 'Passwords do not match'})
            } else if (this.state.user.password.length <= 7 || this.state.user.password2.length <= 7) {
                this.setState({ error: 'Passwords must be at least 8 characters'})
            } else if(!this.validateEmail(this.state.user.email)) {
                this.setState({error: 'Invalid email address.'});
            } else {
                this.setState({
                    error: ''
                });
            }
        });
    }

    validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    userRegister = e => {
        if(!this.validateEmail(this.state.user.email)) {
            this.setState({error: 'Invalid email address.'});
            return;
        }
        if (this.state.user.password.length <= 7 || this.state.user.password2.length <= 7) {
            this.setState({ error: 'Passwords must be at least 8 characters'})
            return;
        }

        if(this.state.user.password !== this.state.user.password2) {
            this.setState(({error: 'Passwords do not match'}))
            return;
        }

        this.props.clearError();

        this.setState({
            error: ''
        });

        const newUser = {
            username: this.state.user.username,
            email: this.state.user.email.toLowerCase(),
            password1: this.state.user.password,
            password2: this.state.user.password2,
        }

        this.props.registerUser(newUser);
        // this.props.history.push("/login");
    };

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

const mapStateToProps = state => ({
    error: state.error,
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps, { getUser, registerUser, clearError })(RegisterView);