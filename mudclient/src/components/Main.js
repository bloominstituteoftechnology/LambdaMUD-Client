import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Room from './Room';

const Div = styled('div')`
  background-color: #666;
  height: 500px;
  padding: 20px;
  color: white;
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
    if (localStorage.getItem('jwt')) {
      this.setState({ loggedin: true });
    } else {
      this.setState({ loggedin: false });
    }
  }

  render() {
    const { uuid, name, title, description, players } = this.state;
    return (
      <React.Fragment>
        <Div>
          {this.state.loggedin ? (
            <div>
              <Room
                uuid={uuid}
                name={name}
                title={title}
                description={description}
                players={players}
              />
            </div>
          ) : (
            <div>You are logged out :(</div>
          )}
        </Div>
      </React.Fragment>
    );
  }
}

export default Main;
