import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: this.props.logged_in,
            token: '',
            text: '',
            URL: 'https://lambda-mud-game.herokuapp.com/api/adv/init/',
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
                    // Subscribe to Pusher broadcasts
                    let pusher = new Pusher('32e1f511d8c6046a4598', {
                        cluster: 'us2',
                        forceTLS: true
                      });
                    let channel = pusher.subscribe(`p-channel-${res.p_uuid}`)
                    channel.bind(`broadcast`, function(data) {
                        alert(JSON.stringify(data));
                      });
                }
            })
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Game