import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Register from './components/Register';
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import * as actions from './actions';
import Login from "./components/Login";
import Nav from "./components/Nav";
import Game from "../components/Game";



class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav logoutUser={this.props.logoutUser} history={this.props.history} />
        <Route
          path="/register"
          render={props => (
            <Register {...props} registerUser={this.props.registerUser} />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <Login {...props} loginUser={this.props.loginUser} />
          )}
        />
        <Route
          path="/game"
          render={props => (
            <Game
              {...props}
              fetchInitInfo={this.props.fetchInitInfo}
              title={this.props.title}
              description={this.props.description}
              name={this.props.name}
              players={this.props.players}
              data={this.props.data}
              fetchNewMessage={this.props.fetchNewMessage}
              uuid={this.props.uuid}
              movePlayer={this.props.movePlayer}
              talkPlayer={this.props.talkPlayer}
            />
          )}
        />
        <GlobalStyle />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    registeringUser: state.registeringUser,
    loggingInUser: state.loggingInUser,
    loggingOutUser: state.loggingOutUser,
    fetchingInit: state.fetchingInit,
    title: state.title,
    description: state.description,
    name: state.name,
    players: state.players,
    data: state.data,
    error: state.error,
    uuid: state.uuid
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(App)
);

