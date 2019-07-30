import React from 'react';
import ReactDOM from 'react-dom';
import {
    NavLink,
    Link,
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import Home from './component/Home'
import Game from './component/Game'
import Signup from './component/Signup'
import Login from './component/Login'
import App from './App';

const client = new ApolloClient({ uri: 'http://localhost:4000'})


ReactDOM.render(
<ApolloProvider client = {client}>
    <Router>
        <>
            <nav className='navBar'>
                
                <NavLink to='/'>Home</NavLink>               
                <NavLink to='/game'>Game</NavLink>  
                <NavLink to='/signup'>Signup</NavLink>
                <NavLink to='/login'>Login</NavLink>
            </nav>
            <div className='linkBar'>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/game' component={Game} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                </Switch>
            </div>
        </>
    </Router>
</ApolloProvider>, document.getElementById('root'));

