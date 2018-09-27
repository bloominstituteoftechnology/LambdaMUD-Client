import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Pusher from 'pusher-js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Room from './Room';

const Div = styled('div')`
  background-color: #666;
  height: 100vh;
`;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      init: false,
      uuid: '',
      name: '',
      title: '',
      description: '',
      players: [],
      playersInRoom: '',
      error: '',
      reqOpts: '',
      pusher: '',
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  initPusher = uuid => {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

    const pusher = new Pusher('a0c0420fc17033250a4d', {
      cluster: 'us2',
      forceTLS: true,
    });

    const usersChannel = 'p-channel-' + uuid;
    const channel = pusher.subscribe(usersChannel);
    channel.bind('broadcast', data => {
      // console.log('PUSHER INFO:', data.message);
      let tempArr = this.state.players;
      if (data.message.includes('walked')) {
        console.log('exited', tempArr);
      }
      if (data.message.includes('entered')) {
        console.log('entered', tempArr);
      }
      this.setState({ pusher: data.message });
    });
  };

  componentDidMount() {
    const token = localStorage.getItem('jwt');

    if (token) {
      this.setState({ loggedin: true });
      const authToken = 'Token ' + token;
      const requestOptions = {
        headers: { Authorization: authToken },
      };
      this.setState({ reqOpts: requestOptions });
      if (!this.state.init) {
        axios
          .get(
            'https://muddy-waters.herokuapp.com/api/adv/init/',
            requestOptions,
          )
          .then(res => {
            const { uuid, name, title, description, players } = res.data;
            this.initPusher(uuid);
            this.setState({
              uuid,
              name,
              title,
              description,
              players,
              init: true,
            });
          })
          .catch(err => {
            console.log("there's an error :(", err.response.data);
            this.setState({ error: err.response });
          });
      }
    }
  }

  componentWillReceiveProps() {
    const token = localStorage.getItem('jwt');
    if (token) {
      const authToken = 'Token ' + token;
      const requestOptions = { headers: { Authorization: authToken } };
      this.setState({ loggedin: true, reqOpts: requestOptions });
    } else {
      this.setState({ loggedin: false, reqOpts: '' });
    }
  }

  moveCharacter = direction => {
    const requestOptions = this.state.reqOpts;
    const DIROBJ = { direction };
    axios
      .post(
        'https://muddy-waters.herokuapp.com/api/adv/move/',
        DIROBJ,
        requestOptions,
      )
      .then(res => {
        const { uuid, name, title, description, players, error_msg } = res.data;
        if (error_msg) {
          let err = `You can not move ${direction}!`;
          this.setState({ error: err });
          this.toggle();
        }
        this.setState({
          uuid,
          name,
          title,
          description,
          players,
          pusher: '',
        });
      })
      .catch(err => {
        // console.log("there's an error :(", err.response.data);
        this.setState({ error: err.response });
        this.toggle();
      });
  };

  sayCharacter = message => {
    const requestOptions = this.state.reqOpts;
    const MESSAGEOBJ = { message };
    axios
      .post(
        'https://muddy-waters.herokuapp.com/api/adv/say/',
        MESSAGEOBJ,
        requestOptions,
      )
      .then(res => {
        const { uuid, name, title, description, players } = res.data;
      })
      .catch(err => {
        console.log("there's an error :(", err.response.data);
        this.setState({ error: err.response });
      });
  };

  render() {
    let {
      uuid,
      name,
      title,
      description,
      players,
      pusher,
      playersInRoom,
    } = this.state;
    return (
      <Div>
        {this.state.loggedin ? (
          <React.Fragment>
            <Room
              uuid={uuid}
              name={name}
              title={title}
              description={description}
              players={players}
              doMove={this.moveCharacter}
              doSay={this.sayCharacter}
              pusherInfo={pusher}
            />
            <div>
              <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Wrong way!</ModalHeader>
                <ModalBody>{this.state.error}</ModalBody>
                <ModalFooter>
                  <Button autoFocus color="secondary" onClick={this.toggle}>
                    {'<ESC>'}
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </React.Fragment>
        ) : (
          <div>You are logged out :(</div>
        )}
      </Div>
    );
  }
}

export default Main;
