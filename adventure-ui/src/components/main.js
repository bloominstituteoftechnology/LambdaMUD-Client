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
            input: ''
        };
    }

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

    render() {
        return(
        <div>
            <div>
                <h4>{this.state.title}</h4>
                <p>{this.state.description}</p>
            </div>
        </div>
        )}
}

export default GameView;