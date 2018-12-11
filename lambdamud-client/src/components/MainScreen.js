import React from 'react';
import axios from 'axios';

class MainScreen extends React.Component {
  state = {
    uuid: '',
    name: '',
    title: '',
    description: '',
    players: [],
    error_msg: '',
    direction: '',
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    const options = {
      headers: {
        "Authorization": 'Token ' + token
      }
    }  

  axios
      .get('https://lambdamud-project-week.herokuapp.com/api/adv/init/', options)
      .then(response => {
        console.log(response);
        this.setState({ uuid: response.data.uuid, name: response.data.name, title: response.data.title, description: response.data.description, players: response.data.players });
      })
      .catch(err => {
        console.log(err.response);
      });
      
  
    }

  
    moveToRoom = event => {
        event.preventDefault();

        const token = localStorage.getItem('token');

        const options = {
            headers: {
              "Authorization": 'Token ' + token
          }

    }
    
        const userMove = {
          'direction': this.state.direction,
        }       

        axios
        .post('https://lambdamud-project-week.herokuapp.com/api/adv/move/', userMove, options)
        .then(response => {
          console.log(response);
          this.setState({ name: response.data.name, title: response.data.title, description: response.data.description, players: response.data.players, error_msg: response.data.error_msg });
        })
        .catch(err => {
          console.log(err.response);
        });

        this.setState({description: ''});
        this.props.history.push('/mainscreen');
      }

      handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
      }


  render() {
    const playersArray = this.state.players.slice();
    
    return(
    <div>
      <h1>Main Screen</h1>
        <p>{this.state.name}</p>
        <p>{this.state.title}</p>
        <p>{this.state.description}</p>
      
      {playersArray.map((player,index) => <div className={"players"} key={index} player={player} >
            <p>{player}</p>
          </div>)}
          <p>{this.state.error_msg}</p>
        <form onSubmit={this.moveToRoom}>
        <div>
          <label htmlFor="direction"></label>
          <input
            name="direction"
            value={this.state.direction}
            onChange={this.handleInputChange}
            type="text"
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
    );
  }

}

export default MainScreen;
