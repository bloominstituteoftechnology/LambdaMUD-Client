import React from 'react';
import axios from 'axios';

export default class MainScreen extends React.Component {
    state = {

    }

    componentDidMount() {

    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return ( 
            <div>
                
            </div>
        )
    }
}