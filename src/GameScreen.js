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
        uuid: '',
        text: ''
    }

    componentDidMount() {
      // request method, body, and header
      const token = localStorage.getItem("Token");
      axios( {url: `https://sean-lambdamud.herokuapp.com/api/adv/init`, headers: {"authorization": `Token ${token}` }})
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

    handleSayCommand = (e) => {
        const token = localStorage.getItem("Token");
        e.preventDefault();
        axios.post(`https://sean-lambdamud.herokuapp.com/api/adv/say`, {message: this.state.text}, {headers: {"authorization": `Token ${token}`}})
        .then(response => {
            this.setState({
                messages: [...this.state.messages, response.data.message],
                text: ''
            })
        })
        
    }
    handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }
    render() {
        console.log(this.state.messages);
        return (
        <div>
          <div>{this.state.title}</div>
          <div>{this.state.description}</div>
          <form onSubmit={this.handleSayCommand}>
              <input placeholder="Say something" name="text" value={this.state.text} onChange={this.handleChange} />
              <button type="submit">Say</button>
          </form>
          <div>
              {this.state.messages.map(message => {
                  return <div>{message}</div>
              })}
          </div>
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