import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import Pusher from 'pusher-js';


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

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = "/"
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
    

    

    render() { 
        console.log(localStorage.getItem('token'))
        return ( 
            <div>
                <p>play</p>
                <div className='direction-buts'>
                    <button direction='n' className='but-n' onClick={this.move}>&#9650;</button>
                    <button direction='w' onClick={this.move}>&#9664;</button>
                    <button direction='e' onClick={this.move}>&#9654;</button>
                    <button direction='s' onClick={this.move}>&#9660;</button>
                </div>

            </div>
         );
    }
}
 
export default Play;