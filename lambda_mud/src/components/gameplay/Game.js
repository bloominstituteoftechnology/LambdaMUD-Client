import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: this.props.logged_in,
            token: '',
            outputText: [[]],
            statusURL: 'https://lambda-mud-game.herokuapp.com/api/adv/init/',
            moveURl: 'https://lambda-mud-game.herokuapp.com/api/adv/move/',
            sayURL: 'https://lambda-mud-game.herokuapp.com/api/adv/say/',
            pusherID: '32e1f511d8c6046a4598',
        }
    }

    componentDidMount() {
        if (this.state.logged_in){
            this.startGame()
        }
    }

    startGame(data){
        let token = sessionStorage.getItem('token')
        let headers = {"Authorization": `Token ${token}`}
        try{
            axios.get(this.state.URL, headers).then(res => {
                if(!res.error_msg && !res.detail){
                    console.log("Response", res)
                    this.subscribeToPusher(res.data.uuid)
                    this.initialize(res.data)
                    this.setState({'token': token})
                }
            })
        }
        catch(err){
            return err
        }

    }

    subscribeToPusher(uuid){
        // Subscribe to Pusher broadcasts
        let pusher = new Pusher(this.state.pusherID, {
            cluster: 'us2',
            forceTLS: true
            });
        let channel = pusher.subscribe(`p-channel-${uuid}`)
        channel.bind(`broadcast`, function(data) {
            alert(JSON.stringify(data));
        });
    }


    actionHandler(action, args){
        return this.callAxios(action, args).then()

    }

    async callAxios(action, args){
        let token = sessionStorage.getItem('token')
        let data
        try{
            switch(action){
                case 'initialize':{
                    data = await axios({
                        method: 'get',
                        url: this.state.URL,
                        headers: {"Authorization": `Token ${token}`},
                    }).then(res => {
                        return res
                    })
                    }  
                }
            } 
        catch(error){
            return error
        }
        return data
        
    }

    // handleInput(input){
    //     loweredInput = input.toLowerCase()
    //     switch(loweredInput){
    //         case 'n':

    //     }
    // }

    render() {
        return (
            <div>
                <textarea rows='10' cols='50' readOnly value={this.state.text}></textarea>
            </div>
        )
    }
}

export default Game