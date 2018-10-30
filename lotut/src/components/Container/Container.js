import React, { Component } from 'react';
import Registration from '../Registration/Registration'
import Login from '../Login/Login';
import { Route, Switch } from 'react-router-dom';

class Container extends Component {


    render() {
        return (
            <div className="main_container">
            <Registration />
            <Login />
                {/* <Switch>
                    <Route path='/register' exact component={Registration} />
                    <Route path='/login' exact component={Login} />
                </Switch> */}
            </div>
        )
    }


}

export default Container;