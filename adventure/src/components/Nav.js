import React from 'react';
import { Link } from 'react-router-dom';
import StyledNav from '../styles/nav';

const Nav = props => {
    return (
        <StyledNav>
            {!localStorage.getItem('token') ? (
                <React.Fragment>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </React.Fragment>
            ) : (
                    <React.Fragment>
                        <Link to="/game">Game</Link>
                        <button onClick={() => props.logoutUser(props.history)}>
                            Logout
          </button>
                    </React.Fragment>
                )}
        </StyledNav>
    );
};

export default Nav;
