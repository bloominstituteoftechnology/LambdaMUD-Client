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
      content: []
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
        this.setState({ loading: false, content: content });
        this.createPost('description');
        this.state.channel.bind('broadcast', (data) => {
          console.log('data', data);
          this.createPost('say', data.message);
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
    console.log('current myRef', this.myRef.current);
    if(this.myRef.current) {this.myRef.current.scrollTo(0, 999999999999999999999);}
  }

  createPost(type, content=null) {
    let newPost;
    switch (type) {
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
        console.log('content', content);
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
    content = content.toLowerCase();
    switch (comm.toLowerCase()) {
      case 'move':
        postType = 'description';
        url = this.state.url + 'move';
        let dir = '';
        switch (content){
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
        postType = 'say';
        break;
      default:
        break;
    }
    axios
      .post(url, payload, { headers: { Authorization: this.state.token } })
      .then((res) => {
        console.log(res);
        this.setState({
          description: res.data.description,
          name: res.data.name,
          players: res.data.players,
          title: res.data.title
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
          <p>To speak type "say" and the desired message.</p>
        </div>
      );
    }
  }
}

export default Window;
