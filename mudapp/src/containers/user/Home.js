import React, { Component } from 'react';
import axios from 'axios';

import Register from '../../components/user/Register';
import Login from '../../components/user/Login';

import { Main, HomeHeader, HomeBody } from '../ContainerStyles';


class Home extends Component {
  state = {
    initFetching: false, // loading
    initfetchSuccess: null, // new state
    initfetchFailure: null, // error mssg
  }

  initPlayer = (apiKey) => {
    // initFetching: true
    // init loader START current view - maybe say 'setting up your room' or something
    // This stage is still home page
    // This can be a transition
    axios({
      method: 'get',
      url: 'https://heromudapp.herokuapp.com/api/adv/init',
      headers: {'Authorization': `Token ${apiKey}`}
    })
    .then(res => {
      // initFetching: false
      // initfetchSuccess: true

      // DO
      // init loader END current view
      // Send new view - Current room(initRoomInfo)
      let roomInfo = {
        apiKey: apiKey,
        username: res.data.name,
        userUUID: res.data.uuid,
        roomTitle: res.data.title,
        roomDescription: res.data.description,
        players: res.data.players,
      }
      this.props.initRoomInfo(roomInfo);
    })
    .catch(err => {
      // initFetching: false
      // initfetchFailure: true
      
      // No errors listed

      // DO
      // Loader END current view
      // For whatever reason, if error=true, Update current view to reflect error
      // Maybe say, 'something went wrong, try again, if error persists, open a new tab' or something like that
      console.log('ERROR', err.response);
    });
  }

  render() {
    return (
      <Main>
        <HomeHeader>
          <h1>Welcome, Stranger</h1>
        </HomeHeader>
        <HomeBody>
          <Register initPlayer={this.initPlayer} />
          <Login initPlayer={this.initPlayer} />
        </HomeBody>
      </Main>
    )
  }
}

export default Home;
