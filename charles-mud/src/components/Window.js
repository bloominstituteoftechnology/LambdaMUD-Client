import React from "react";
import InputComponent from "./InputComponent";
import axios from 'axios';
import Pusher from 'pusher-js';

class Window extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'https://charles-mud.herokuapp.com',
      headers: {'Authorization': 'Token ' + localStorage.getItem('key')},
      description: '',
      name: '',
      players: [],
      title: '',
      uuid: '',
      channel: null,
      loading: true
    }
  }

  componentDidMount() {
    const init = this.state.url + '/api/adv/init'
    const auth = 'Token '.concat(localStorage.getItem('key'));
    axios.get(init, { headers: { Authorization: auth } })
      .then((res) => {
        console.log('axios call');
        const pusher = new Pusher("4a0a79cd8884db0caca6", { cluster: 'us2' });
        console.log('data', res.data);
        var channel = pusher.subscribe(`p-channel-${res.data.uuid}`);
        this.setState({
          description: res.data.description,
          name: res.data.name,
          players: res.data.players,
          title: res.data.title,
          uuid: res.data.uuid,
          channel: channel
        });
      })
      .then((res) => {
        console.log('set loading to false');
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log('catch err', err);
      })
  }

  render() {
    while (this.state.loading) {
      return (
        <div className='loading'>
          <h1>Loading...</h1>
        </div>
      )
    }
    while(!this.state.loading) {
      try{
        if(this.state.channel){
          this.state.channel.bind('broadcast', function(data) {
            alert('An event was triggered with message: ' + data.message);
          });
        }
      }
      catch(err){
        console.log('error: ', err);
      }
      return (
        <div className="textwindow">
          <p>window stuff</p>
          <InputComponent />
        </div>
      );
    }
  }
}

export default Window;
