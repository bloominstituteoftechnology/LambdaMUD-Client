import React, {Component} from 'react';
import axios from 'axios'

class Adv extends Component {
    
    state = {
        input: '',
        player: '',
        currentRoom: '',
        description: '',
        others: ''
    }
    
  
    componentDidMount() {
        const token = sessionStorage.getItem('key');

        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    
        axios
          .get('http://localhost:8000/api/adv/init')
          .then(res => {
            this.setState({ player: res.data.name, currentRoom: res.data.title, description: res.data.description, others: res.data.players })
            if (this.state.others === '') {
                this.setState({others: 'No one'}) 
            }
            else {
                let players = ''
                this.state.others.forEach(p => {
                    players = `${players} -${p}`
                })
                this.setState({others: players})
            }
          })
          .catch(err => {
            console.log('error: ', err.message)
          }) 
    }

    textHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }
  
    move = direction => {
        axios
            .post('http://localhost:8000/api/adv/move/', {"direction": direction})
            .then(res => {
                this.setState({currentRoom: res.data.title, description: res.data.description, others: res.data.players})
                let players = ''
                this.state.others.forEach(p => {
                   players = `${players} -${p}`
                })
            })
            .catch(err => {
                console.log('error: ', err.message)
            })    
    }

    sendReq = e => {
        let arr = ['n', 's', 'e', 'w']
        if (arr.includes(this.state.input)) {
            this.move(this.state.input)
            this.setState({input: ''})
        }
        else {
            this.setState({input: ''})
        }
    }
    
  
    render() {
      return (
        <div className="App">
          <div className='textBox'>
            <p>You enter the {this.state.currentRoom}</p>
            <p>{this.state.description}</p>
            <p>Others in the room: {this.state.others}</p>
          </div>
          <div className='typeBar'>
            <div className='textEntry'>
              <input 
                type= 'text'
                name= 'input'
                value= {this.state.input}
                placeholder= 'What would you like to do...'
                onChange= {this.textHandler}
              />
            </div>
            <button className='send' type='submit' onClick={this.sendReq}>Send</button>
          </div>
        </div>
      );
    }
  }

  export default Adv;