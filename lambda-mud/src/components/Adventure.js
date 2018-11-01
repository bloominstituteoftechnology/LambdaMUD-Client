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

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
    }

    grabToken() {
        const auth_header = {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }
        return auth_header;
    }

    handleMove = (e) => {
        e.preventDefault()
        const dir_cmd = {
            "direction": this.state.direction
        }
        const auth_header = this.grabToken();
        console.log(dir_cmd)
        axios.post(`${url}move`, dir_cmd, auth_header)
        .then(response => {
            console.log(response)
            this.setState({
                name: response.data.name,
                title: response.data.title,
                description: response.data.description,
                players: response.data.players,
                direction: ''
            })
        })
        .catch(err => console.log(err))
    }



    componentDidMount() {
        // const auth_header = {
        //     headers: {
        //         Authorization: `Token ${localStorage.getItem('token')}`
        //     }
        // }
        const auth_header = this.grabToken();

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
                        <li key={player} >{player} </li>
                        ))}
                    </ul>
                </h3>
                <form>
                    <label>Enter Direction (n, s, e, w)</label>
                    <input value={this.state.direction} placeholder='n/s/e/w' onChange={this.handleChange} name='direction' />
                    <button type='button' onClick={this.handleMove} >Move</button>
                </form>


            </div>
        )
    }
}

export default Adventure;