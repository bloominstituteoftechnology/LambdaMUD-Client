import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'

class Home extends Component {
    render() {
        return (
            <div className='home-container'>
                <header className='home-header'>
                    <h1>Welcome to LambdaMUD by cameronsray</h1>
                </header>
                <nav className='home-nav-container'>
                    <Link className='nav-link' to='/api/registration'>Register</Link>
                    <Link className='nav-link' to='/api/login'>Log in</Link>
                </nav>
                
            </div>
        );
    }
}

export default Home;