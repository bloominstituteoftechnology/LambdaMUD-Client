import React from 'react';
import Button from '@material-ui/core/Button'

function NavBar(props) {
  return (
    <div>
      Navbar at top of screen
      <Button variant="contained" onClick={props.tempChangeLogin} >Temp - Change Login Status</Button>
    </div>
  );
}

export default NavBar;