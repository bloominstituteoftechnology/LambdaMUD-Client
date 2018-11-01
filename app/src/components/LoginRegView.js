import React, { Component } from 'react';
import {
  Route, Link
} from 'react-router-dom';
import Login from './LoginView';
import Register from './RegisterView';

const LoginRegView = () => {

  return (
    <form>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </form>
  )
}

export default LoginRegView