import React, { Component } from 'react'
import axios from 'axios'
export default class Init extends Component {
    state={
        uuid:'',
        name:'',
        title:'',
        description:'',
        players: []
    }
    componentDidMount(){
        axios   
            .get('http://lambda-mud-test.herokuapp.com/api/adv/rooms/')
            .then(res => {
                this.setState({
                    uuid:res.data.uuid,
                    name:res.data.username,
                    title:res.data.title,
                    description: res.data.description,
                    players: res.data.players
                })
            })
    }

    render() {
        const {uuid, name, title, description, players} = this.state
        return (
            <div>
                <h3>Your information</h3>
                <p>{uuid}</p>
                <p>Your name: {name}</p>
                <p>you are here at {title}</p>
                <p>{description}</p>
                <p>other player in the same area as you: {players.map(player => player)}</p>
            </div>
        )
    }
}
