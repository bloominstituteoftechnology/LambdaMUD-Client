import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button``;

class Navbar extends Component {
    constructor(props){
        super(props);
    }
    logout = e => {
        e.preventDefault();
        localStorage.removeItem('Authorization');
        window.location.href=`${process.env.REACT_APP_FRONTEND_URL}login`
    }
    render(){
        return (
            <div style={{padding:'1rem', color:'grey', outline:'0', position:'absolute', top:'0', right:'0'}}>
                <Link to='/registration' style={{padding: '1rem', textDecoration:'none', background: "teal"}}>Register</Link>
                <Link to='/login' style={{padding: '1rem', textDecoration:'none', background: "teal"}}>Login</Link>
                <button style={{border: 'none', color:'blue', background:'teal'}} onClick={this.logout}>Logout</button>
            </div>
        )
    }
};

export default Navbar;