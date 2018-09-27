import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import Pusher from 'pusher-js';
import { Link } from "react-router-dom";



var pusher = new Pusher('08110d122a2706fe0485', {
    cluster: 'us2',
    forceTLS: true
});

class Play extends Component {
    state = { 
        content: 'Use arrow keys on your keyboard!', 
        player: {

        }
    }

    componentDidMount() {

        axios
            .get('http://localhost:8000/api/adv/init', {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log(response)
                this.setState({ player: response.data })

                let channelString = 'p-channel-' + response.data.uuid
                var channel = pusher.subscribe(channelString);
                channel.bind('broadcast', function (data) {
                    console.log('DATA', JSON.stringify(data))
                    alert(JSON.stringify(data));
                });

            })
            .catch(error => {
                console.log(error)
            })
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = "/"
    }

    move = (e) => {
        const direction = e.target.getAttribute('direction');
        console.log(direction)
        axios
            .post('http://localhost:8000/api/adv/move/', { "direction": direction }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then(response => {
                console.log(response.data)
                this.setState({ player: response.data })
            })
            .catch(error => {
                console.log(error)
            })
    }
    

    

    render() { 
        console.log(this.state)
        return ( 
            <div>
                <div className='game'>
                    <div className="card mb-sm-4 col-sm-9 ui-state-default">
                        <div className="card-head no-bg">
                            <h5 className="d-sm-inline">Player name: {this.state.player.name}</h5>
                        </div>
                        <div className="list-group list-group-flush">
                            <p className="mt-sm-2">Title: {this.state.player.title}</p>
                            <p className="mt-sm-2">Description: {this.state.player.description}</p>                            
                        </div>
                    </div>
                </div>
                <div className='direction-buts'>
                    <button direction='n' className='but-n' onClick={this.move}>&#9650;</button>
                    <button direction='w' onClick={this.move}>&#9664;</button>
                    <button direction='e' onClick={this.move}>&#9654;</button>
                    <button direction='s' onClick={this.move}>&#9660;</button>
                </div>
                <Link to="/">
                    <button className="home-button">
                        Home
                    </button>
                </Link>
            </div>
         );
    }
}
 
export default Play;