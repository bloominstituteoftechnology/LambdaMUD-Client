/*************************
 * 
 * Renders Login and Register components
 * 
 *************************/

import React from 'react'
import Login from './Login/Login'
import Register from './Register/Register'

import './Portal.css'

const Portal = () => {
  return (
    <div className='portal'>
      <Login />
      <p>- or -</p>
      <Register />
    </div>
  )
}

export default Portal