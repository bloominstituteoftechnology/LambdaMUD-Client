import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: this.props.logged_in,
            token: '',
            outputText: [],
            statusURL: 'https://lambda-mud-game.herokuapp.com/api/adv/init/',
            moveURL: 'https://lambda-mud-game.herokuapp.com/api/adv/move/',
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
        let headers = { "Authorization": `Token ${token}` }

        try{
            axios.get(this.state.URL, headers)
                .then(res => {

                    if(!res.detail){

                        this.subscribeToPusher(res.data.uuid)
                        let status = { res, textType: 'location' }
                        this.setState({ token: token, outputText: [...this.state.outputText, status] })

                    }
                    else{

                        let status = { error: res.detail, textType: 'error' }
                        this.setState({ token: token, outputText: [...this.state.outputText, status] })

                    }
                })
        }
        catch(err){

            let status = { error: err, textType: 'error' }
            this.setState({ outputText: [...this.state.outputText, status] })

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



    move(direction){

        let header = { Authorization: `Token ${this.state.token}` }
        direction = { direction: direction }

        try{
            axios.post(this.state.moveURL, header, direction)
                .then(res => {

                    if(!res.error_msg){

                        let status = { ...res, textType: 'location' }
                        this.setState({ outputText: [...this.state.outputText, status] })

                    }
                    else{

                        let status = { error: res.error_msg, textType: 'error' }
                        this.setState({ outputText: [...this.state.outputText, status] })

                    }
                })
        }
        catch(err){

            let status = { error: err, textType: 'error' }
            this.setState({ outputText: [...this.state.outputText, status] })

        }
    }




    say(phrase){

        let header = { Authorization: `Token ${this.state.token}` }
        let message = { message: phrase }

        try{
            axios.post(this.state.sayURL, header, message)
                .then(res => {

                    if(!res.detail){

                        let status = { ...res, textType: 'location' }
                        this.setState({ outputText: [...this.state.outputText, status] })

                    }
                    else{

                        let status = { error: res.detail, textType: 'error' }
                        this.setState({ outputText: [...this.state.outputText, status] })

                    }
                })
        }
        catch(err){

            let status = { error: err, textType: 'error' }
            this.setState({ outputText: [...this.state.outputText, status] })

        }
    }

    handleInput(input){

        let commands = input.split('')

        switch(commands[0].toLowerCase()){
            case 'move':
                

        }
    }

    render() {
        return (
            <div>
                <div>
                    
                </div>
            </div>
        )
    }
}

export default Game
