import React, { Component } from 'react';
import Console from './Console';
import Input from './Input';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            title: '',
            description: '',
            players: [],
        }
    }
    render() { 
        return (
            <div className='Game'>
                <h1>Game View</h1>
                <Console />
                <Input />
            </div>
        );
    }
}
 
export default Game;