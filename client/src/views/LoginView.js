import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin, getUser, setMessage } from '../store/actions';
import Login from "../components/Authentication/Login";
import Pusher from "pusher-js";

class LoginView extends Component {
    state = {
        user: {
            username: '',
            password: '',
        },
        error: '',
    };

    // Handles the user's input
    handleChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value,
            }
        });
    };

    /**
     * Logs the user in from the credentials provided in state
     * No Return
     */
    login = () => {
        // Set error to nothing
        this.setState({ error: '' });

        // Create a user object
        const user = {
            username: this.state.user.username,
            password: this.state.user.password
        }

        // Send the user to the action and push the user to the main page
        this.props.userLogin(user);
        // this.props.getUser();

    }

    pusherSub = () => {
        let pusher = new Pusher('aa9399a4a86317a4a570', {
            cluster: 'us2',
            forceTLS: true
        });

        const channel = pusher.subscribe('my-channel');
        channel.bind('my-event', data => {
            this.props.setMessage(data.message);
        });
    }

    render() {
        return (
            <Login
                {...this.props}
                user={this.state.user}
                error={this.props.error}
                localError={this.state.error}
                handleChange={this.handleChange}
                login={this.login}
                isLoggedIn={this.props.isLoggedIn}
                getUser={this.props.getUser}
            />
        )

    }
};

const mapStateToProps = state => ({
    error: state.error,
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps, { userLogin, getUser, setMessage })(LoginView);