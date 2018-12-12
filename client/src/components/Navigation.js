import React from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {logout} from '../actions/index';

class Navigation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentUser: 'CurrentUser'
        }
    }

    handleLogout = event => {
        event.preventDefault();
        this.props.logout();
    }

    render(){
        return(
            <div>
                <NavLink to = '/'>Home</NavLink>
                <NavLink to = '/register'>Register</NavLink>
                <NavLink to = '/login'>Login</NavLink>
                <NavLink to = '/game'>Game</NavLink>
                <div className = 'nav-link' onClick={this.handleLogout}>Logout</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        isLoggedIn: state.isLoggedIn,
    }
}

export default withRouter(connect(mapStateToProps, {
    logout,
})(Navigation))