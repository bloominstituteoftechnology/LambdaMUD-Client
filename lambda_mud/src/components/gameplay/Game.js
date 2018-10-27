import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import styled from 'styled-components';
import InputBox from './InputBox';

// Styling

const Conversation = styled.div`
    color: green;
`
const Error = styled.div`
    color: red;
`
const Location = styled.div`
    color: black;
`



class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logged_in: this.props.logged_in,
            token: '',
            outputText: [], // Array of objects with property textType: 'location', 'error', or 'conversation'
            statusURL: 'https://lambda-mud-game.herokuapp.com/api/adv/init/',
            moveURL: 'https://lambda-mud-game.herokuapp.com/api/adv/move/',
            sayURL: 'https://lambda-mud-game.herokuapp.com/api/adv/say/',
            pusherID: '32e1f511d8c6046a4598',
        }
        // Retain "this" context of handleInput when passed to InputBox
        this.handleInput = this.handleInput.bind(this)
    }



    componentDidMount() {

        if (this.state.logged_in) {
            this.startGame()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.outputText !== this.state.outputText) {
            this.setState({ outputText: nextProps.outputText });
        }
        console.log("In willReceiveProps", this.state.outputText)
    }


    startGame() {

        let token = sessionStorage.getItem('token')
        let headers = { headers: { "Authorization": `Token ${token}` } }

        try {
            axios.get(this.state.statusURL, headers)
                .then(res => {
                    console.log("Res in startGame: ", res)
                    console.log("res.data", res.data)
                    if (!res.detail) {    // server returns res.detail on error

                        // Create status message and add to outputText in status
                        this.subscribeToPusher(res.data.uuid)
                        let status = { ...res.data, textType: 'location' }
                        this.setState({ token: token, outputText: [...this.state.outputText, status] })

                    }
                    else {

                        // Create an error message and add to outputText in state
                        let status = { error: res.detail, textType: 'error' }
                        this.setState({ token: token, outputText: [...this.state.outputText, status] })

                    }
                })
        }
        catch (err) {

            let status = { error: err, textType: 'error' }
            this.setState({ outputText: [...this.state.outputText, status] })

        }
    }



    subscribeToPusher(uuid) {
        // Subscribe to Pusher broadcasts
        let pusher = new Pusher(this.state.pusherID, {

            cluster: 'us2',
            forceTLS: true

        });

        let channel = pusher.subscribe(`p-channel-${uuid}`)

        channel.bind(`broadcast`, function (data) {
            alert(JSON.stringify(data));
        });
    }



    move = (direction) => {

        let headers = { headers: { Authorization: `Token ${this.state.token}` } }
        direction = { direction: direction }

        try {
            axios.post(this.state.moveURL, direction, headers)
                .then(res => {

                    if (!res.error_msg) {

                        let status = { ...res.data, textType: 'location' }
                        this.setState({ outputText: [...this.state.outputText, status] })

                    }
                    else {

                        let status = { error: res.error_msg, textType: 'error' }
                        this.setState({ outputText: [...this.state.outputText, status] })

                    }
                })
        }
        catch (err) {

            let status = { error: err, textType: 'error' }
            this.setState({ outputText: [...this.state.outputText, status] })

        }
    }



    say(phrase) {

        let headers = { headers: { Authorization: `Token ${this.state.token}` } }
        let message = { message: phrase }

        try {
            axios.post(this.state.sayURL, message, headers)
                .then(res => {

                    if (!res.detail) {

                        let status = { ...res.data, textType: 'conversation' }
                        this.setState({ outputText: [...this.state.outputText, status] })

                    }
                    else {

                        let status = { error: res.detail, textType: 'error' }
                        this.setState({ outputText: [...this.state.outputText, status] })

                    }
                })
        }
        catch (err) {

            let status = { error: err, textType: 'error' }
            this.setState({ outputText: [...this.state.outputText, status] })

        }
    }

    handleInput(input) {

        let commands = input.split(' ')

        switch (commands[0].toLowerCase()) {
            case 'move':

                let firstLetter = commands[1][0].toLowerCase()
                let DirectionsRegexp = /[nsew]/

                if (firstLetter && DirectionsRegexp.test(firstLetter)) {

                    this.move(firstLetter)

                } else {

                    let status = { error: "Please enter a valid direction (N,S,E,W)", textType: 'error' }
                    this.setState({ outputText: [...this.state.outputText, status] })

                }
                break;

            case 'say':
                if (commands[1]) {

                    this.say(commands[1])

                } else {

                    let status = { error: "You didn't day anything", textType: 'error' }
                    this.setState({ outputText: [...this.state.outputText, status] })

                }
                break;

            default:

                let status = { error: "Please enter a valid command (See help)", textType: 'error' }
                this.setState({ outputText: [...this.state.outputText, status] })

        }
    }

    render() {
        console.log("outputText: ", this.state.outputText);
        return (
            <div>
                <div>
                    <div>
                        {this.state.outputText.map((text, index) => {
                            if (text.textType === 'location') {
                                return <Location key={index}>{text.title}<br />{text.description}</Location>
                            }
                            else if (text.textType === 'conversation') {
                                return <Conversation key={index}>You say {text.message}</Conversation>
                            }
                            else if (text.textType === 'error') {
                                return <Error key={index}>{text.error}</Error>
                            }
                            else
                                return <div key={index}>Error in mapping output</div>
                        })}
                    </div>
                    <InputBox handleInput={this.handleInput} />
                </div>
            </div>
        )
    }
}

export default Game
