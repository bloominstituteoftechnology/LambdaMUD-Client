import React, {Component} from 'react';
import axios from 'axios';


class GameView extends Component {
    constructor() {
        super();
        this.state = {
            uuid: '',
            name: '',
            title: '',
            description: '',
            players: [],
            messages: [],
            input: '', 
            direction: '',
        };
    }

// ----- Get data from server ----- 
componentDidMount() {
    this.handleData();
}

handleData = () => {
    console.log('has the handleData function been called?')
    const header = {
      headers: {
        authorization: `TOKEN ${localStorage.getItem('token')}`
      }
    };

    axios
    .get('https://baldwin-adv-project.herokuapp.com/api/adv/init/', header)
    .then(response =>{
      console.log(response)
      this.setState(response.data)
      console.log(this.state)
    })
    .catch(error => {console.log(error)
    })
  }

// ----- handler functions for player movement -----
handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
}

handleMove = event => {
    console.log('has the handleSubmit function been called?')
    event.preventDefault();

    const header = {
        headers: {
          authorization: `TOKEN ${localStorage.getItem('token')}`
        }
      };
    
    axios
    .post('https://baldwin-adv-project.herokuapp.com/api/adv/move/', header, {direction: this.state.direction})
    .then(response => {
        console.log(response)
        this.setState(response.data)
    })
    
    .catch(error => console.log(error));
};

    render() {
        return(
        <div>
            <div>
                <h4>you are in: {this.state.title}</h4>
                <p>{this.state.description}</p>
            </div>
            <form onSubmit = {this.handleMove}>
                <input
                name = 'direction'
                value = {this.state.direction}
                onChange = {this.handleChange}
                placeholder = "enter a move"
                />
                <button>
                    Make Your Move
                </button>    
            </form>

        </div>
        )}
}

export default GameView;