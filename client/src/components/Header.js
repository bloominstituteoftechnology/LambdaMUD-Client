import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="header">
        <div className="">
          <div className="title">Treasure Hunt</div>
          
          {authToken && (
            <div className="flex">
              <div className="ml1">|</div>
              <Link to="/rooms" className="rooms">
                Enter Rooms ->
              </Link>
            </div>
          )}
        </div>
        <div className="logout">
          {authToken ? (
            <div
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.push(`/`)
              }}
            >
              logout
            </div>
          ) : (
              <Link to="/login" className="login">
                login
            </Link>
            )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)