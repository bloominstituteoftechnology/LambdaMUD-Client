import React, { Component } from 'react';
import axios from 'axios'



import { Route, withRouter, Link, NavLink } from 'react-router-dom'

import PasswordForm from './PasswordForm'
import UsernameForm from './UsernameForm'

//agregale la funcion para que cuando alguien typee, se cambie el texto
//PasswordForm y UsernameForm

class MainScreen extends React.Component {
    
    state = {
        game_text: '',
        password: '',
    }
    
    //  como consigo la info del juego?
    //  con algo como un curl call
    //   componentdidmount - subir todal ainfo del jeugo
    // como la cambio cuando apache?
    
    componentDidMount() {
    let tokenStr = 'c84ddf5b9eb19381c1fed77b0b1d6524ac53dceb'
    console.log('didmount running')
    axios
      .get('http://localhost:8000/api/adv/init/',
      { headers: {"Authorization" : `Bearer ${tokenStr}`} }
      )
      .then(response => {
          console.log('this works') 
            console.log(response)
            this.setState(() => ({ game_text: response }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

      handleChange = e => {
        this.setState({ [e.target.name] : e.target.value})
      }

    render() {
        return(
            <div className="note-options">
            <p>{this.state.game_text}</p>
                {/* <GameLog
                    username={this.state.username}
                    handleChange={this.handleChange}
                />
                <UserInput
                    password={this.state.password}
                    handleChange={this.handleChange}
                    name='password'
                /> */}
            </div>
        )
    }
}

export default MainScreen
