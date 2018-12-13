import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

class Adv extends Component {
    constructor(props) {
        super(props); 
        this.state = {
           uuid: '',
           name: '',
           location: '',
           description: '',
           players: [],
           occupants: 0,
           move: '',
           message: '',
           saymessage: '',
           saidmessage: '',
           displaymessage: '',
        };
    }

    componentDidMount() {
        const token = localStorage['token'];
        console.log('Adv CDM, token in localStorage: ', localStorage['token']);
        axios
            .get('http://lambdamud-by-cameronsray.herokuapp.com/api/adv/init/', {
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log('Adv CDM GET response:, ', response);
                // return this.setState(
                //     {
                //         uuid:response.data.uuid,
                //         name: response.data.name,
                //     }
                // )
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    render() {
        return (
            <div className='adv-console-container'>
                Adventure Console
            </div>
        );
    }
}

export default Adv;