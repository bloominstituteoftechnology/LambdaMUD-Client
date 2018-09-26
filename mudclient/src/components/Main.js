import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Room from './Room';

const Div = styled('div')`
  background-color: #666;
  height: 500px;
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
      error: '',
      reqOpts: '',
    };
  }

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
    console.log('OPTS', requestOptions);
    const DIROBJ = { direction };
    console.log('DIR', DIROBJ);
    axios
      .post(
        'https://muddy-waters.herokuapp.com/api/adv/move/',
        DIROBJ,
        requestOptions,
      )
      .then(res => {
        const { uuid, name, title, description, players } = res.data;
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
  };

  render() {
    const { uuid, name, title, description, players } = this.state;
    return (
      <Div>
        {this.state.loggedin ? (
          <Room
            uuid={uuid}
            name={name}
            title={title}
            description={description}
            players={players}
            doMove={this.moveCharacter}
          />
        ) : (
          <div>You are logged out :(</div>
        )}
      </Div>
    );
  }
}

export default Main;
