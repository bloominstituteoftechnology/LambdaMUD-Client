import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { logoutUser, } from '../store/actions';
import Navigation from '../components/Navigation/Navigation';

class NavigationView extends Component {
    render() {
        return (
            <div>
                <Navigation username={this.props.username}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggingIn,
    username: state.username
});

export default connect(mapStateToProps, { logoutUser })(NavigationView)