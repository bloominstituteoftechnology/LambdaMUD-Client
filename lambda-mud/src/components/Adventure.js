import React, { Component } from 'react';
import axios from 'axios';

const url = 'https://lambda-mud-app.herokuapp.com/api/adv/';

class Adventure extends Component {
    state = {
        name: '',
        title: '',
        description: '',
        players: [],
        error_msg: '',
        command: '',
        direction: ''
    }

    componentDidMount() {
        const auth_header = {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }

        axios.get(`${url}init`, auth_header)
        .then(response => {
            this.setState({
                name: response.data.name,
                title: response.data.title,
                description: response.data.description,
                players: response.data.players,
            })
        })
        .catch(err => console.log(err))

    }

    render() {
        return (
            <div>
                <h3>Where: {this.state.title}</h3>
                <h3>Surroundings: {this.state.description}</h3>
                <h3> Who else is there?
                    <ul>
                        {this.state.players.map(player => (
                        <li >{player} </li>
                        ))}
                    </ul>
                </h3>

            </div>
        )
    }
}

export default Adventure;