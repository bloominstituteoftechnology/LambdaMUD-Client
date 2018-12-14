import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin, getUser, setMessage } from '../store/actions';
import Login from "../components/Authentication/Login";

/**
 * Handles all the Login information to be sent to the action/reducer
 */
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

    }

    // Renders the component
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

// Define the props from the Redux Store
const mapStateToProps = state => ({
    error: state.error,
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps, { userLogin, getUser, setMessage })(LoginView);