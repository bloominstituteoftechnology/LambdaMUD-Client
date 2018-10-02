import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './registration.css'
import { Button } from 'reactstrap';

class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <h1 className='wrapper'>Welcome to LambdaMUD</h1>
                <Link to='/api/registration'><Button className='homeButton'>Register</Button></Link>
                <Link to='/api/login'><Button className='homeButton'>Login</Button></Link>
                <br>
                </br>
                <br>
                </br>
            </div>
        );
    }
}

export default Start;