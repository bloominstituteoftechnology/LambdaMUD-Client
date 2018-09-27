import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div>
                <span>{this.props.username ? (<span>Welcome {this.props.username}</span>) : (<span>Please <Link to={`/login`}>Sign In</Link></span>)}</span>
                <span><button onClick={this.props.handleLogout}><Link to={`/login`}>Logout</Link></button></span>
            </div>
        )
    }
}

export default Navbar