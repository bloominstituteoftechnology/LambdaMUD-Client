import React, { Component } from 'react';
import RoomView from './RoomView';
import ChatView from './ChatView';

// const header = {
//   headers: {
//     authorization: `TOKEN ${localStorage.getItem('token')}`
//   }
// }
// axios.get('https://muddy-screams.herokuapp.com/api/adv/init/', header)
// .then( response => {
//   console.log(response)
// })
// .catch(e => console.log(e))

class MUDView extends Component {
  state = {

  }
  
  

  onFieldChange = (e) => {
    console.log({[e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = () => {
    console.log("Logging in");
  }

  redirectToLogin = () => {
    this.props.history.push('/login');
  }

  render(){
    console.log(`props in MUDVIEW >> ${this.props}`);
    return (
      <form>
        <RoomView />
        <ChatView />
      </form>
    )
  }
}

export default MUDView