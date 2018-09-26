import React, { Component } from 'react';
import axios from 'axios'
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: '',
            move: '',
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        axios
            .get("https://lamb-mud.herokuapp.com/api/adv/init/",
                {
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                }
            )
            .then(response => {
                console.log(response.data)
                this.setState({ player: response.data })
            })
            .catch(err => console.log(err.response))
    }
    playerMove = e => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        const data = { direction: this.state.move }
        axios
            .post("https://lamb-mud.herokuapp.com/api/adv/move/", data,
                {
                    headers: {
                        "Authorization": `Token ${token}`,
                    }
                }
            )
            .then(response => {
                console.log(response.data)
                this.setState({ player: response.data, move: '' })
            })
            .catch(err => console.log(err.response))
    }

    handleInputChange = (e) => {
        return this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                Current Location: {this.state.player.title}
                <div>
                    <form onSubmit={this.playerMove}>
                        <input
                            type="text"
                            name="move"
                            value={this.state.move}
                            onChange={this.handleInputChange}
                            placeholder="Next move..."
                        />
                        <button type="submit" className="login-button" onSubmit={this.playerMove}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Game;