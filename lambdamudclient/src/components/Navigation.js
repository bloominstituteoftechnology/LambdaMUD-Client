import React from 'react';
import {Link} from 'react-router-dom';
import {NavStyled, NavButton} from './style.js';

class Navigation extends React.Component{
    goHome = event =>{
        event.preventDefault();
        this.props.goHome();
    }

    render(){
        return(
            <NavStyled>
                <NavButton>
                    <Link to={'/'}>Home</Link>
                </NavButton>
                <NavButton>
                    <Link to={'/login'}>Login</Link>
                </NavButton>
                <NavButton>
                    <Link to={'/register'}>Register</Link>
                </NavButton>
            </NavStyled>
        )
    }
}

export default Navigation;