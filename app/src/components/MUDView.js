import React, { Component } from 'react';
import RoomView from './RoomView';
import ChatView from './ChatView';
import '../styles/MUDStyles.css';

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
    data: null
  }
  
  componentDidMount(){
    let data = this.props.history.location.state;
    this.setState({data: data })
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
    console.log(this.context);
    return (
      <div className="mud-view">
        {/* <h1>{this.state.data}</h1> */}
        <RoomView />
        <ChatView />
      </div>
    )
  }
}

export default MUDView