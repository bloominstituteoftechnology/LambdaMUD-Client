import axios from 'axios';
import React, {Component} from 'react';

const url = 'https://adventuregame-app.herokuapp.com'

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

componentDidMount() {
    this.handleData();
}

handleData = () => {
    const header = {
      headers: {
        authorization: `TOKEN ${localStorage.getItem('token')}`
      }
    };

    axios
    .get(`${url}/api/adv/init/`, header)
    .then(response =>{
      console.log(response)
      this.setState(response.data)
      console.log(this.state)
    })
    .catch(error => {console.log(error)
    })
  }

handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
}

MakeMove = event => {
    event.preventDefault();

    const header = {
        headers: {
          authorization: `TOKEN ${localStorage.getItem('token')}`
        }
      };
    
    axios
    .post(`${url}/api/adv/move/`, {direction: this.state.direction}, header)
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
                <h4>Description: {this.state.title}</h4>
                <p>{this.state.description}</p>
            </div>
            <form onSubmit = {this.MakeMove}>
                <input
                name = 'direction'
                value = {this.state.direction}
                onChange = {this.handleChange}
                placeholder = "Enter a direction"
                />
                <button>
                    Press To Move
                </button>    
            </form>

        </div>
        )}

}
export default GameView;