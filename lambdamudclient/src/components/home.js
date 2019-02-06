import React, { Component } from 'react';
// import { Link, Route } from 'react-router-dom';
// import Register from './register';
// import Login from './login';

class Home extends Component {
    render() {
        return (
            <div> 
                <div>
                    <h1>MUD</h1>
                    <h3>Adventure Time</h3>
                    <h3>| (• ◡•)| (❍ᴥ❍ʋ)</h3>
                </div>
                {/* <div>
                    <Link to='/login' className="navlinks">Login</Link>
                    <Link to='/register' className="navlinks">New User</Link>

                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </div> */}
            </div>
        )
    }
}
export default Home;