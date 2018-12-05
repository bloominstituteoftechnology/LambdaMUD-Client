import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';


// Component Home displays home page with links to navigate to
// Play Game, Login and Register
class Home extends Component {
    render() {
        return (
            <Fragment>
                <h1>LambdaMUD is AWESOME!!!</h1>
                <Link to="/play">
                    <Button color="primary" size="lg">Let's Play</Button>{' '}
                </Link>
                <Link to="/login">
                    <Button color="info" size="lg">LogIn</Button>{' '}
                </Link>
                <Link to="register">
                    <Button color="success" size="lg">Register</Button>
                </Link>
            </Fragment>
        )}
}

export default withRouter(Home);