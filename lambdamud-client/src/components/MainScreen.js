import React, { Component } from 'react';
import axios from 'axios'



import { Route, withRouter, Link, NavLink } from 'react-router-dom'

import GameLog from './GameLog'
import UserInput from './UserInput'

//agregale la funcion para que cuando alguien typee, se cambie el texto
//PasswordForm y UsernameForm

class MainScreen extends React.Component {

    state = {
        room_name: '',
        description: '',
        players: [],
        next_move: '',
    }

    // room name, description, other players
    //  como consigo la info del juego?
    //  con algo como un curl call
    //   componentdidmount - subir todal ainfo del jeugo
    // como la cambio cuando apache?

    componentDidMount() {
    let tokenStr = 'c84ddf5b9eb19381c1fed77b0b1d6524ac53dceb'
    console.log('didmount running')
    axios
      .get('http://localhost:8000/api/adv/init/',
      { headers: {"Authorization" : `Token ${tokenStr}`} }
      )
      .then(response => {
          console.log('this works')
            console.log(response)
            this.setState(() => ({ 
                description: response.data['description'],
                room_name: response.data['title'],
                players: response.data['players']
            }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

      handleChange = e => {
        this.setState({ [e.target.name] : e.target.value})
      }

      handleSubmit = (e) => {
        e.preventDefault();
        let next_move = this.state.next_move
        let tokenStr = 'c84ddf5b9eb19381c1fed77b0b1d6524ac53dceb'
        axios
        .post('http://localhost:8000/api/adv/move/',
        {
            "direction": next_move
        },
            {
                headers: {"Authorization" : `Token ${tokenStr}`} ,
            }
        )
        .then(response => {
            console.log('sending a move .then')
            if (response.data['error_msg']){
                alert(response.data['error_msg']);
            }
            else{
                this.setState({ 
                    description: response.data['description'],
                    room_name: response.data['title'],
                    players: response.data['players'],
                    next_move: '', 
                })
            }
        })
        .catch(error => {
            console.error('Server Error', error);
        });
      }


    render() {
        return(
            <div className="note-options">
                <GameLog
                    text={this.state.description}
                    players={this.state.players}
                    room_name={this.state.room_name}
                />
                <UserInput
                    next_move={this.state.next_move}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    name='next_move'
                />
            </div>
        )
    }
}

export default MainScreen
