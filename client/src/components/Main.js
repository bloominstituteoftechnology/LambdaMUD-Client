import React from 'react';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import axios from 'axios';
import background from '../images/background.jpg';
import logo from '../images/logo2.png';
import NavBar from './Nav/Navbar';

injectGlobal`
    body {
        background-image: url(${background});
        background-size: cover;
    }
`

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        const token = localStorage.getItem('lambda-token');
        if (!token) {
            this.props.history.replace('/login')
        }

    }

    handleLogout = () => {
        localStorage.removeItem('lambda-token');
    }

    render() { 
        return ( 
            <div>
                <NavBar />
                <img src={logo} alt="LambdaMUD"/>
            </div>
         );
    }
}

export default Main;