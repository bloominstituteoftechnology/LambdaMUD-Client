import React, { Component } from 'react';
import Registration from '../Registration/Registration'
import Login from '../Login/Login';
import GameView from '../GameView/GameView';
import { Route, Switch } from 'react-router-dom';


class Container extends Component {
    render() {
        return (
            <div className="main_container">
                <Switch>
                    <Route path='/register' exact component={Registration} />
                    <Route path='/' exact component={Login} />
                    <Route path='/game' exact component={GameView} />
                </Switch>
            </div>
        )
    }
}

export default Container;