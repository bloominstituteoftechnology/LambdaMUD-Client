import React from 'react';
import Button from '@material-ui/core/Button'

function NavBar(props) {
  return (
    <div>
      Navbar at top of screen
      {props.loggedIn ? <Button variant="contained" onClick={props.logout} >Logout</Button> : null}
    </div>
  );
}

export default NavBar;