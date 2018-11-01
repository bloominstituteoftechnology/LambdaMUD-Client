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
    data: this.props.history.location.state.data
  }
  
  componentDidMount(){
    // let initData = this.props.history.location.state.data;
    // this.setState({data: initData });
    console.log(this.state.data);
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
    return (
      <div className="mud-view">
        {/* <h1>{this.state.data}</h1> */}
        <RoomView data={this.state.data}/>
        <ChatView data={this.state.data}/>
      </div>
    )
  }
}

export default MUDView