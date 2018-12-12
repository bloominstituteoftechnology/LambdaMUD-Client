import React, {Component} from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: "",
            location: "",
            name: "",
            description: "",
            players: [],
            message: "",
            direction: "",
            title: ""
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        console.log('token in CDM: ', token)
        axios
            .get('https://greb-lambdamud.herokuapp.com/api/adv/init', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                console.log('response : ', response)
                this.setState({
                    title: response.data.title,
                    name: response.data.name,
                    description: response.data.description,
                    players: response.data.players,
                    uuid: response.data.uuid
                })
            })
    }
    render() {
        return (
            <div>
                <div className='roomDetails'>Room: {this.state.title}</div>
                <div className='roomDetails'>Players: {this.state.players}</div>
                <div className='roomDetails'>Description: {this.state.description}</div>
                <br />
                <Button onClick={() => this.Logout()}> Logout </Button>
            </div>
        )
    }
}

export default GamePage;