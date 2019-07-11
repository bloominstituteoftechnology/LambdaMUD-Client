import React from 'react';
import { Container, Typography, TextField, Button } from '@material-ui/core';

function Register(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10vh'
      }}
    >
      <Typography variant="h4">Register</Typography>
      <form>
        <TextField
          variant="filled"
          id="username"
          label="Username"
          name="username"
          margin="normal"
          required
          fullWidth
          onChange={e => this.changeHandler(e)}
          autoFocus
        />
        <TextField
          variant="filled"
          id="password"
          label="Password"
          name="password"
          margin="normal"
          required
          fullWidth
          type="password"
          onChange={e => this.changeHandler(e)}
        />
        <TextField
          variant="filled"
          id="passwordcheck"
          label="Password"
          name="passwordcheck"
          margin="normal"
          required
          fullWidth
          type="password"
          onChange={e => this.changeHandler(e)}
        />
        <Button
          onClick={props.registrationHandler}
          // type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
        </Button>
        <Button
          onClick={props.registerChange}
          component="div"
          fullWidth
          variant="outlined"
          style={{ margin: '10px 0' }}
        >
          Already have an account? Sign Up
        </Button>
      </form>
    </div>
  );
}

export default Register;
