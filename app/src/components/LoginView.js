import React, { Component } from 'react';

const Login = () => {

  return (
    <form>
      <input type="text" name="username" />
      <input type="text" name="password" />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Login