// Game.js
// Implements a game display and shows messages from the Django server and the Pusher server.

import React from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';


class Game extends React.Component {
    constructor(props) {
        super(props)
        // Initializes state: input field, player name, a log of rooms and messages, 
        // player's UUID, a boolean of whether Pusher channel has been subscribed to
        this.state = {
            input: '',
            name: '',
            movesLog: [],
            uuid: null,
            channelSubbed: false,
            currentRoom: '',
            flickerClass: 'printList crt',
            isFlickering: true,
            flickerTag: 'off',
            interval: null
        }
        this.channel = null;
        
    }

    componentDidMount = () => {
        // Gets token from localStorage
        const token = localStorage.getItem('token');
        // Makes call to Django server to initialize the player in the game
        axios.get('https://lambdamud-ghr.herokuapp.com/api/adv/init/', {headers: {Authorization: `Token ${token}`}})
        .then(response => {
            // Sets state with data received from axios call
            this.setState({
                name: response.data.name,
                movesLog: [...this.state.movesLog, {
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                    inventory: response.data.inventory,
                }],
                uuid: response.data.uuid,
                currentRoom: response.data.title
            })
            // Instantiates a new Pusher object
            const pusher = new Pusher('990ddef61491c8ebceb4', {
                cluster: 'us2'
            })
            // Subscribes channel to Pusher if UUID is present
            if (this.state.uuid) {
                this.channel = pusher.subscribe(`p-channel-${this.state.uuid}`, this.state.uuid);
            }
            // Sets boolean on state that Pusher channel has been subscribed
            this.setState({channelSubbed: true})
            if (this.state.channelSubbed) {
                // Binds channel to receive broadcast messages
                this.channel.bind('broadcast', data => {
                    this.setState({movesLog: [...this.state.movesLog, {message: data.message}]}
                )})
            }
            
        })
        const interval = setInterval(() => this.toggleFlicker(), 5000)
        this.setState({interval: interval})
        
    }
    componentWillUnmount = () => {
        clearInterval(this.state.interval)
    }

    // Parses commands from the input field
    parseCommand = (event) => {
        event.preventDefault();
        this.setState({movesLog: [...this.state.movesLog, {command: this.state.input}] })
        // These first four conditionals handle move directions
        if (this.state.input.toLowerCase() === 'n' || this.state.input.toLowerCase() === 'north') {
            this.handleMove('n')
        } else if (this.state.input.toLowerCase() === 's' || this.state.input.toLowerCase() === 'south') {
            this.handleMove('s')
        } else if (this.state.input.toLowerCase() === 'e' || this.state.input.toLowerCase() ==='east') {
            this.handleMove('e')
        } else if (this.state.input.toLowerCase() === 'w' || this.state.input.toLowerCase() === 'west') {
            this.handleMove('w')
        // Handles say function
        } else if (this.state.input.toLowerCase().startsWith('say')) {
            this.handleSay(this.state.input.slice(4))
        } else if (this.state.input.toLowerCase().startsWith('shout')) {
            this.handleShout(this.state.input.slice(6))
        } else if (this.state.input.toLowerCase().startsWith('whisper')) {
            const whisperArr = this.state.input.split(' ');
            console.log(whisperArr[1])
            const whisperMinus = this.state.input.split(' ');
            whisperMinus.shift();
            whisperMinus.shift();
            const message = whisperMinus.join(' ');
            this.handleWhisper(message, whisperArr[1])
        } else if (this.state.input.toLowerCase() === 'h' || this.state.input.toLowerCase() === 'help') {
            this.handleHelp()
        } else if (this.state.input.toLowerCase() === 'map') {
            this.handleMap()
        } else if (this.state.input.toLowerCase() === 'knock stump') {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    error: 'You realize you are not in Transylvania anymore.'
                }],
            })
        } else if (this.state.input.toLowerCase().startsWith("take")) {
            const takeArr = this.state.input.split(" ");
            takeArr.shift();
            const takeItem = takeArr.join(' ');
            this.handleTake(takeItem);
        } else if (this.state.input.toLowerCase().startsWith("drop")) {
            const dropArr = this.state.input.split(" ");
            dropArr.shift();
            const dropItem = dropArr.join(' ');
            this.handleDrop(dropItem);
        } else if (this.state.input.toLowerCase() === "inv" || this.state.input.toLowerCase() === "inventory") {
            this.handleInv();
        } else {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    error: 'That command does not exist.'
                }],
            })
        }
        // Resets input field to blank string when form is submitted
        this.setState({input: ''})
    }

    // Handles move function in any of four directions
    handleMove = (direction) => {
        // Gets token from localStorage
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json"
        }
        const data = {
            "direction": direction
        }
        // Sends axios call to move endpoint with direction data and auth/content headers
        axios.post('https://lambdamud-ghr.herokuapp.com/api/adv/move/', data, {headers: headers})
        .then(response => {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    title: response.data.title,
                    description: response.data.description,
                    players: response.data.players,
                    error: response.data.error_msg,
                    // inventory: response.data.inventory,
                }],
                currentRoom: response.data.title
            })
            axios.get('https://lambdamud-ghr.herokuapp.com/api/adv/init/', {headers: {Authorization: `Token ${token}`}})
            .then(response2 => {
                // Sets state with data received from axios call
                this.setState({
                    // name: response.data.name,
                    movesLog: [...this.state.movesLog, {
                        // title: response.data.title,
                        // description: response.data.description,
                        // players: response.data.players,
                        inventory: response2.data.inventory,
                    }],
                    // uuid: response.data.uuid,
                    // currentRoom: response.data.title
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            console.log(err)
        })
    }


    // Handles sending messages to players in current room
    handleSay = (message) => {
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json",
        }
        const data = {
            "message": message
        }
        // Sends axios call to say endpoint with message data and auth/content headers
        axios.post('https://lambdamud-ghr.herokuapp.com/api/adv/say/', data, {headers: headers})
        .then(response => {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    message: response.data.message,
                    players: [this.state.name]
                }]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleShout = (message) => {
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json"
        }
        const data = {
            "message": message
        }
        // Sends axios call to say endpoint with message data and auth/content headers
        axios.post('https://lambdamud-ghr.herokuapp.com/api/adv/shout/', data, {headers: headers})
        .then(response => {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    message: response.data.message,
                }]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleWhisper = (message, toUser) => {
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json"
        }
        const data = {
            "message": message,
            "toUser": `${toUser}`,
            "test": 'anything'
        }
        // Sends axios call to say endpoint with message data and auth/content headers
        axios.post('https://lambdamud-ghr.herokuapp.com/api/adv/whisper/', data, {headers: headers})
        .then(response => {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    message: response.data.message,
                }]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleHelp = () => {
        this.setState({
            movesLog: [...this.state.movesLog, {
                title: 'Help',
                description: 'To move North, type "n" or "north". To move South, type "s" or "south". To move East, type "e" or "east". To move West, type "w" or "west". To say something to players in your current room, type "say <something>". To shout to all players in the game, type "shout <something>". To whisper something to one player, type "whisper <person> <something>". To see the map, type "map". To take an item, type "take <full item name>". To drop an item, type "drop <full item name>". To query your inventory, type "inv" or "inventory".'
            }]
        })
    }

    handleMap = () => {
        this.setState({
            movesLog: [...this.state.movesLog, {
                title: 'Map',
                description: 
                <div className="mapContainer">
                    <div className="mapRow1"><div className={this.state.currentRoom === "Sandy Beach" ? "mapBox mapBoxHighlighted" : "mapBox"}>Sandy Beach</div><div className="horizMapLine"></div><div className={this.state.currentRoom === "Glimmering Lighthouse" ? "mapBox mapBoxHighlighted" : "mapBox"}>Glimmering Lighthouse</div><div className="horizMapLine"></div><div className={this.state.currentRoom === "Hidden Room" ? "mapBox mapBoxHighlighted" : "mapBox"}>Hidden Room</div></div>
                    <div className="mapRow2"><div className="mapBoxBlankShort"></div><div className="horizMapLineBlank"></div><div className="mapBoxBlankShort"></div><div className="horizMapLineBlank"></div><div className="vertMapLineSpecial"></div></div>
                    <div className="mapRow3"><div className="mapBoxBlank"></div><div className="horizMapLineBlank"></div><div className={this.state.currentRoom === "Grand Overlook" ? "mapBox mapBoxHighlighted" : "mapBox"}>Grand Overlook</div><div className="horizMapLineBlank"></div><div className={this.state.currentRoom === "Treasure Chamber" ? "mapBox mapBoxHighlighted" : "mapBox"}>Treasure Chamber</div></div>
                    <div className="mapRow4"><div className="mapBoxBlankShort"></div><div className="horizMapLineBlank"></div><div className="vertMapLine"></div><div className="mapBoxBlankShortSquished"></div><div className="vertMapLine"></div></div>
                    <div className="mapRow5"><div className="mapBoxBlank"></div><div className="horizMapLineBlank"></div><div className={this.state.currentRoom === "Foyer" ? "mapBox mapBoxHighlighted" : "mapBox"}>Foyer</div><div className="horizMapLine"></div><div className={this.state.currentRoom === "Narrow Passage" ? "mapBox mapBoxHighlighted" : "mapBox"}>Narrow Passage</div></div>
                    <div className="mapRow6"><div className="mapBoxBlankShort"></div><div className="horizMapLineBlank"></div><div className="vertMapLine"></div><div className="horizMapLineBlank"></div><div className="mapBoxBlankShort"></div></div>
                    <div className="mapRow7"><div className="mapBoxBlank"></div><div className="horizMapLineBlank"></div><div className={this.state.currentRoom === "Outside Cave Entrance" ? "mapBox mapBoxHighlighted" : "mapBox"}>Outside Cave Entrance</div><div className="horizMapLineBlank"></div><div className="mapBoxBlank"></div></div>
                </div>
            }]
        })
    }

    handleTake = (item) => {
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json"
        }
        const data = {
            "item": item
        }
        // Sends axios call to say endpoint with message data and auth/content headers
        axios.post('https://lambdamud-ghr.herokuapp.com/api/adv/take/', data, {headers: headers})
        .then(response => {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    message: response.data.message,
                    error: response.data.error,
                }]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleDrop = (item) => {
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json"
        }
        const data = {
            "item": item
        }
        // Sends axios call to say endpoint with message data and auth/content headers
        axios.post('https://lambdamud-ghr.herokuapp.com/api/adv/drop/', data, {headers: headers})
        .then(response => {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    message: response.data.message,
                    error: response.data.error,
                }]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleInv = () => {
        const token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Token ${token}`, 
            "Content-Type": "application/json"
        }
        // Sends axios call to say endpoint with message data and auth/content headers
        axios.get('https://lambdamud-ghr.herokuapp.com/api/adv/inventory/', {headers: headers})
        .then(response => {
            this.setState({
                movesLog: [...this.state.movesLog, {
                    message: `You have: ${response.data.items}`,
                }]
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    // Updates input field in state
    changeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    toggleFlicker = () => {
        this.state.isFlickering ? this.setState({isFlickering: false, flickerClass: 'printList', flickerTag: 'on'}) : this.setState({isFlickering: true, flickerClass: 'printList crt', flickerTag: 'off'})
    }

    render () {
        // Reverses movesLog for display
        const history = this.state.movesLog.slice().reverse();
        return (
            <div>
                <div className="gameBox">
                {/* Displays player's username */}
                <p>Welcome, {this.state.name}</p>
                <div className={this.state.flickerClass}>
                    {/* Maps over reversed movesLog and displays what is present in that move */}
                    {history.map(move => 
                    <div>
                        {move.title ? <h4 className="titleH4">{move.title}</h4> : null}
                        {move.description ? <p className="descP">{move.description}</p> : null}
                        {/* Displays players if they are in the room and nothing if none are present. */}
                        {move.players ? move.players.length ? <p className="playersP">Players: {move.players.join(', ')}</p> : null : null}
                        {move.inventory ? move.inventory.length ? <p className="invP">This room contains: {move.inventory.join(', ')}</p> : null : null}
                        {move.message ? <p className="messageP">{move.message}</p> : null}
                        {move.error ? <p className="errorP">{move.error}</p> : null}
                        {move.command ? <p className="commandP">{move.command}</p> : null}
                    </div>
                    )}
                </div>
                {/* Form for input field and submit button */}
                <form onSubmit={this.parseCommand} className="inputAndButton">
                    <input type="text" 
                    name="input" 
                    value={this.state.input} 
                    placeholder="Type a direction or command or message here." 
                    onChange={this.changeHandler} 
                    className="gameInput"
                    autocomplete="off"/>
                    <button type="submit" className="gameSubmit">Submit</button>
                </form>
                <button type="button" onClick={() => clearInterval(this.state.interval)}>Cancel screen flicker auto-toggle</button>
                <button type="button" onClick={this.toggleFlicker}>Turn screen flicker {this.state.flickerTag}</button>
                <button type="button" onClick={this.props.logout}>Log out</button>
                </div>

            </div>
        )
    }
}

export default Game;