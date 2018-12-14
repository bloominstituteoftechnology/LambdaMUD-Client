import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser, } from '../store/actions';
import Navigation from '../components/Navigation/Navigation';

/**
 * Handles all the Navigation information
 */
class NavigationView extends Component {

    /**
     * Logs the user out
     */
    logout = () => {
        this.props.logoutUser();
    }

    // Renders the component
    render() {
        return (
            <div>
                <Navigation username={this.props.username} isLoggedIn={this.props.isLoggedIn} logout={this.logout}/>
            </div>
        )
    }
}

// Setup props
const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn,
    username: state.username
});

export default connect(mapStateToProps, { logoutUser })(NavigationView)