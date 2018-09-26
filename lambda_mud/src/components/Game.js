import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: this.props.logged_in,
            token: '',
            text: 'Hello World',
            URL: 'https://lambda-mud-game.herokuapp.com/api/adv/init/',
            pusherID: '32e1f511d8c6046a4598',
        }
    }

    componentDidMount() {
        if (this.state.logged_in){
            let token = sessionStorage.getItem('token')
            axios({
                method: 'get',
                url: this.state.URL,
                headers: {"Authorization": `Token ${token}`},
            }).then(res => {
                if(!res.error_msg && !res.detail){
                    this.subscribeToPusher(res)
                }
            })
        }
    }

    subscribeToPusher(response){
        // Subscribe to Pusher broadcasts
        let pusher = new Pusher(this.state.pusherID, {
            cluster: 'us2',
            forceTLS: true
            });
        let channel = pusher.subscribe(`p-channel-${response.data.uuid}`)
        channel.bind(`broadcast`, function(data) {
            alert(JSON.stringify(data));
        });
    }



    render() {
        return (
            <div>
                <textarea rows='10' cols='50' readOnly value={this.state.text}></textarea>
            </div>
        )
    }
}

export default Game