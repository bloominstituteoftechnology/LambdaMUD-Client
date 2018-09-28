import React from 'react';
import {Route} from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';

//declares all route paths
const Root = () => {
    return (
        <div>
            <Route path='/' component={App} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
           
        </div>
    )
}

export default Root;