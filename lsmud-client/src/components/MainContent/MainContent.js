import React, { Component } from 'react'
import './MainContent.css';
import View1 from '../View1/View1'
import AuthForm from '../AuthForm/AuthForm';
import { Route, Switch } from 'react-router-dom';

export default class MainContent extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path='/view1' exact component={View1} />
          <Route path="/login" component={AuthForm} />
          <Route path="/register" component={AuthForm} />
        </Switch>
      </div>
    )
  }
}