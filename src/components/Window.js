import React from "react";
import InputComponent from "./InputComponent";
import axios from 'axios';
import Pusher from 'pusher-js';

class Window extends React.Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.callApi = this.callApi.bind(this);
    this.createPost = this.createPost.bind(this);
    this.state = {
      url: 'https://charles-mud.herokuapp.com/api/adv/',
      token: 'Token ' + localStorage.getItem('key'),
      description: '',
      name: '',
      players: [],
      title: '',
      uuid: '',
      channel: null,
      loading: true,
      content: [],
    }
  }

  componentDidMount() {
    const init = this.state.url + 'init'
    //const auth = 'Token '.concat(localStorage.getItem('key'));
    let content = [];
    for(let i=0;i<17;i++){
      content.push('\n');
    }
    axios.get(init, { headers: { Authorization: this.state.token } })
      .then((res) => {
        const pusher = new Pusher("4a0a79cd8884db0caca6", { cluster: 'us2' });
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
        this.setState({ loading: false, content: content });
        this.createPost('description');
        this.state.channel.bind('broadcast', (data) => {
          this.createPost('say', data.message);
        });
        this.state.channel.bind('attack', (data) => {
          console.log(data);
          this.createPost('attack', data.message);
        });
      })
      .then(() => {
        this.myRef.current.scrollTo(0, 999999999999999999999);
      })
      .catch((err) => {
        console.log('catch err', err);
      })
  }

  componentDidUpdate() {
    if(this.myRef.current) {this.myRef.current.scrollTo(0, 999999999999999999999);}
  }

  createPost(type, content=null) {
    let newPost;
    switch (type) {
      case 'attack':
        newPost = (
          <div className='atkmessage'>
            <p>{content}</p>
          </div>
        );
        break;
      case 'description':
        newPost = (
            <div className='sysmessage'>
              <p>{this.state.title}</p>
              <p>{this.state.description}</p>
              <p className='players'>Players: {this.state.players.join(', ')}</p>
            </div>
          )
        break;
      case 'say':
        newPost = (
          <div className='saymessage'>
            <p>{content}</p>
          </div>
        )
        break;
      default:
        break;
    }
    let posts = this.state.content;
    posts.push(newPost);
    this.setState({ content: posts });
  }

  callApi(comm, content=null) {
    let url, payload, postType;
    switch (comm.toLowerCase()) {
      case 'attack':
        url = this.state.url + 'attack';
        payload = {'target':content};
      //  postType = 'attack';
        break;
      case 'shout':
        url = this.state.url + 'shout';
        payload = {'message':content};
        break;
      case 'move':
        postType = 'description';
        url = this.state.url + 'move';
        let dir = '';
        switch (content.toLowerCase()){
          case 'n':
          case 'north':
            dir = 'n';
            break;
          case 'e':
          case 'east':
            dir = 'e';
            break;
          case 's':
          case 'south':
            dir = 's';
            break;
          case 'w':
          case 'west':
            dir = 'w';
            break;
          default:
            break;
        }
        payload = {"direction":dir};
        break;
      case 'say':
        url = this.state.url + 'say';
        payload = {'message':content};
        break;
      default:
        break;
    }
    axios
      .post(url, payload, { headers: { Authorization: this.state.token } })
      .then((res) => {
        console.log(res.data);
        this.setState({
          description: res.data.description,
          name: res.data.name,
          players: res.data.players,
          title: res.data.title,
        });
      })
      .then(() => {
        this.createPost(postType);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <div className='loading'>
          <h1>Loading...</h1>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <div className="textwindow" ref={this.myRef} >
            {this.state.content.map((post) => {
              return post;
            })}
          </div>
          <InputComponent callApi={this.callApi} />
          <p>To move type "move" and the desired direction.</p>
          <p>To speak type "say" or "shout" and the desired message.</p>
          <p>To attack type "attack" and the target's name.</p>
        </div>
      );
    }
  }
}

export default Window;
