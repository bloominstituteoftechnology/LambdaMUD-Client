import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  state = { 
    title: '',
    description: '',
    input: '',
   }

  handleInput = (e) => {
    this.setState({ input: e.target.value });
  }

  handleMove = (e) => {
    e.preventDefault();
    const moveDirection = { direction: this.state.input };
    console.log(e.target.value)
    axios.post(
      'https://mudmud.herokuapp.com/api/adv/move',
      moveDirection, {//{"direction":"s"}, {
        headers: 
         //{ Authorization: `Token ${localStorage.getItem(lambdaMudKey)}` }
         { Authorization: `Token 1e85198a887bf656c4da17ea8bc9e4e3d4eea4c7` }
       }
    )
      .then(response => {
        console.log(response)
        this.setState({ 
          title: response.data.title,
          description: response.data.description,
          input: '',
        });
      })
      .catch(err => {
        console.log(err)
      }); 
  }

  componentDidMount() {
    axios.get(
      'https://mudmud.herokuapp.com/api/adv/init', {
       headers: 
       { Authorization: `Token 1e85198a887bf656c4da17ea8bc9e4e3d4eea4c7` }
        //{ Authorization: `Token ${localStorage.getItem(lambdaMudKey)}` }
      }
    )
      .then(response => {
        console.log(response);
        this.setState({ 
          title: response.data.title, 
          description: response.data.description 
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() { 
    return ( 
      <div>
        <h3>{this.state.title}</h3>
        <h5>{this.state.description}</h5>
        <form>
          <input onChange={this.handleInput} type="text" placeholder="enter direction"/>
          <button onClick={this.handleMove}>Move</button>
        </form>
      </div> 
    );
  }
}
 
export default Main;




