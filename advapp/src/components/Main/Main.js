import React, { Component } from 'react';
import axios from 'axios';

import './Main.css';

class Main extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            title: '',
            description: '',

        }
    }

    componentDidMount() {
        const header = {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`
            }
          }
        axios
        .get('https://advbackend.herokuapp.com/api/adv/init/', header)
        .then( response => {
        console.log(response)
        this.setState({ username: response.data.name })
        this.setState({ title: response.data.title })
        this.setState({ description: response.data.description })
    })
        .catch(e => console.log(e))
    }
            

    render() {
        return (
            <div className="game-window">
                <div className="game-output">
                    <span>{this.state.title}</span><br/>
                    <span>{this.state.description}</span>
                </div>
            </div>
        )
    }
}

export default Main;