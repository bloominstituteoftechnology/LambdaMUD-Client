import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

// Bing player uuid/ token to pusher and subscribe, initialize the game, and incorporate
// move/ say in here as well

// I will need to use a componentDidMount for the player information here

// Heroku necessary game links:
// https://lambda-mud-alexis-app.herokuapp.com/api/adv/init/
// https://lambda-mud-alexis-app.herokuapp.com/api/adv/say/
// https://lambda-mud-alexis-app.herokuapp.com/api/adv/move/

class init extends Component {

    // necessary state components:
    // return JsonResponse({'name':player.user.username,
    //  'title':room.title, 
    //  'description':room.description,
    //   'players':players, 
    //   'error_msg':""}, safe=True, status=200)
    // need the uuid to bind a player
    // something to store pusher broadcast events


    state = {
        name: '',
        title: '',
        description: '',
        players: [],
        error_msg: '',
        say: '',
        uuid: '',
        direction: '',
        pusher: []
    }

    // make two handle changes for move and say, or just one?
    // can probably overwrride one
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    // handle moving dirs
    // reference: dirs={"n": "north", "s": "south", "e": "east", "w": "west"}
    // reverse_dirs = {"n": "south", "s": "north", "e": "west", "w": "east"}

    handleMoveInput = e => {
        e.preventDefault()

        const dirs = {
            'direction': this.state.direction
        }
        // get token here
        if (!localStorage.getItem('token')) {
            console.log("No valid login entry, please login.")
        }

        // else we take user generated token, on postman it's "Headers ->Authorization -> Token __________"
        const player_auth = {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }

        axios.post('https://lambda-mud-alexis-app.herokuapp.com/api/adv/move/', dirs, player_auth)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    name: response.data.name,
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                    direction: '',
                    pusher_log: []
                })
            })
    }

    // let's start the game first
    // we need to get the user token from localstorage
    // then use the pusher ID to bind that token to a channel
    // most of the code is given to us on pusher website, our event in the backend is called "broadcast"
    // the json is called data
    componentDidMount() {

        // get token here
        if (!localStorage.getItem('token')) {
            console.log("No valid login entry, please login.")
        }

        // else we take user generated token, on postman it's "Headers ->Authorization -> Token __________"
        const player_auth = {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        }

        // make axios call to init with the token package
        axios.get('https://lambda-mud-alexis-app.herokuapp.com/api/adv/init/', player_auth)
            .then((response) => {
                // console.log(response.data);
                // set state to all the players game information on initialization
                this.setState({
                    name: response.data.name,
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                    uuid: response.data.uuid
                })

                // then we use player_auth to sub the pusher and bind(code given on pusher website)
                var pusher = new Pusher('77f0360b74649e940527', {
                    cluster: 'us2',
                    forceTLS: true
                  });
                  
                  var channel = pusher.subscribe(`p-channel-${this.state.uuid}`);
                  channel.bind('broadcast', data => {
                    const pusher = this.state.pusher.slice();
                    // alert(data.message);
                    this.setState({
                        pusher: pusher
                    })
                  });

            }) // end of .then

    } // end of componentDidMount

    render() {
        return(
            <div className="display">
                <div>
                    <h1>Player Info</h1>
                    <p>{this.state.name}</p>
                </div>
                <div>
                    <h2>Room-Information</h2>
                        <p>{this.state.title}</p>
                        <div>
                            <h1>You can see...</h1>
                            {this.state.players.map((name, id) => (
                                <p key={id}>{name}</p>
                            ))} 
                        </div>
                </div>

            {/* give form for direaction and for the future; say. */}
                <form className="inputs">
                    <label>Enter the direction you would like to go to (n, s, e, w)</label>
                    <input className="dir-form" value={this.state.direction} placeholder='n | s | e | w' onChange={this.handleInputChange} name='direction' />
                    <button type='button' onClick={this.handleMoveInput} >Move to the...</button>
                </form>
            </div> // master div end

        );
    }
} // end of class init



export default init;
