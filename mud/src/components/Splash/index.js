import React from 'react';
import Button from '../Button';
import "./index.css";

const Splash = () => {
  return(
    <div className="Splash">
      <h1 className="Title">Lambda MUD Project</h1>
      <div className="ButtonWrap">
        <Button text="Login"/>
        <Button text="Register"/>
      </div>
    </div>
  )
}

export default Splash;