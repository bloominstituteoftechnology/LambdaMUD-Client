import React, { Component } from 'react'
import '../../index.css';
import '../../App.css';
import { Link } from 'react-router-dom';


export default class Header extends Component {

  handleLogout = () => {
    localStorage.removeItem('token');
    //localStorage.removeItem('username');
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="mb-4">Lambda MUD</h1> 

          {/* {localStorage.username ? <p className="">Welcome, {localStorage.username}</p> : null} */}

          {localStorage.token ? null : <Link to='/registration' style={{ textDecoration: 'none' }}>
            <button type='button' className="btn btn-outline-info mr-2">Register</button>
          </Link>}

          {localStorage.token ? null : <Link to='/login' style={{ textDecoration: 'none' }}>
            <button type='button' className="btn btn-outline-light mr-2">Login</button>
          </Link>}

          {localStorage.token ? <Link to='/login' style={{ textDecoration: 'none' }}>
            <button type='button' onClick={() => this.handleLogout()} className="btn btn-outline-danger">Logout</button>
          </Link> : null}
        </header>
      </div>
    )
  }
}