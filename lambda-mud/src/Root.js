import React from 'react';
import {Route} from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import Adventure from './components/Adventure';

//declares all route paths
const Root = () => {
    return (
        <div>
            <Route path='/' component={App} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/adventure' component={Adventure} />
        </div>
    )
}

export default Root;