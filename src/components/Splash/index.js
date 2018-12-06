import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../Button';
import "./index.css";

const Splash = () => {
  return(
    <div className="Splash">
      <h1 className="Title">Lambda MUD Project</h1>
      <div className="ButtonWrap">
        <Link to="/login"><Button text="Login"/></Link>
        <Link to="/register"><Button text="Register"/></Link>
      </div>
    </div>
  )
}

export default Splash;