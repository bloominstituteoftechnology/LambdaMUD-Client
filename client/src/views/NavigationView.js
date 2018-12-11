import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser, } from '../store/actions';
import Navigation from '../components/Navigation/Navigation';

class NavigationView extends Component {

    logout = () => {
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <Navigation username={this.props.username} isLoggedIn={this.props.isLoggedIn} logout={this.logout}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn,
    username: state.username
});

export default connect(mapStateToProps, { logoutUser })(NavigationView)