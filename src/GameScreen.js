import React from 'react';
import gameScreen from './dungeonGenesis.png';
import axios from 'axios';

export default class GameScreen extends React.Component {
    state = {
        title: '',
        description: '',
        players: [],
        name: '',
        messages: [],
        currentRoomId: '',
        uuid: ''
    }

    componentDidMount() {
      // request method, body, and header
      axios( {url: `https://sean-lambdamud.herokuapp.com/api/adv/init`, headers: {"authorization": `Token ${this.props.token}` }})
      .then(response => {
          this.setState({
              title: response.data.title,
              description: response.data.description,
          })
      })
    }
    
    handleDirection = (directionString) => {
        axios( {url: `https://sean-lambdamud.herokuapp.com/api/adv/move`, method: "post", data: {direction: directionString}, headers: {"authorization": `Token ${this.props.token}`}})
        .then(response => {
            this.setState({
                title: response.data.title,
                description: response.data.description
            })
        })
    }
    render() {
        
        return (
        <div>
          <div>{this.state.title}</div>
          <div>{this.state.description}</div>
          <input placeholder="Say something"/>
          <div>
              <button onClick={() => this.handleDirection('n')}>Go North</button>
              <button onClick={() => this.handleDirection('s')}>Go South</button>
              <button onClick={() => this.handleDirection('w')}>Go West</button>
              <button onClick={() => this.handleDirection('e')}>Go East</button>
          </div>

        </div>
        )
    }
}