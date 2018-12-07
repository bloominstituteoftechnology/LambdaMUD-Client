import React from 'react';
import axios from 'axios';


export default class Register extends React.Component {
    state = {
        username: '',
        password1: '',
        password2: '',
    }

    onChangeHandler = (e) => {
      const value = e.target.value;
      this.setState({
          [e.target.id]: value
      })
    }
    onSubmitHandler = (e) => {
      const {username, password1, password2} = this.state;
      axios.post(`https://sean-lambdamud.herokuapp.com/api/registration `, 
      {username, password1, password2})
      .then(res => {
          console.log(res);
      })
    }

    render() {
        const containerStyles = {
            
        }
        return (
            <div>
                <input id="username" placeholder="username" value={this.state.username} onChange={this.onChangeHandler}/>
                <input id="password1" placeholder="password1" value={this.state.password1} onChange={this.onChangeHandler}/>
                <input id="password2" placeholder="password2" value={this.state.password2} onChange={this.onChangeHandler}/>
                <button id="submit" onClick={this.onSubmitHandler}>Submit</button>
            </div>
        )
    }
}