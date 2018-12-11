import React, { Component } from 'react';

class Registration extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password1: '',
            password2: '',
        }
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
}