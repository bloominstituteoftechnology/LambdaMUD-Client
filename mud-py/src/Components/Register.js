import React from 'react';
import { Typography, TextField, Button } from '@material-ui/core';

function Register(props) {
  const {passwordValid, passwordCheckValid} = props

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
      <form onSubmit={props.registrationHandler} >
        <TextField
          variant="filled"
          id="username"
          label="Username"
          value={props.username}
          name="username"
          margin="normal"
          required
          fullWidth
          onChange={e => props.changeHandler(e)}
          autoFocus
        />
        <TextField
          variant="filled"
          id="password"
          label="Password"
          value={props.password}
          name="password"
          margin="normal"
          error={!passwordValid}
          required
          fullWidth
          type="password"
          onChange={e => props.changeHandler(e)}
        />
        <TextField
          variant="filled"
          id="passwordCheck"
          label="Password"
          value={props.passwordCheck}
          name="passwordCheck"
          margin="normal"
          error={!passwordCheckValid}
          required
          fullWidth
          type="password"
          onChange={e => props.changeHandler(e)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Register
        </Button>
        <Button
          onClick={props.registerChange}
          component="div"
          fullWidth
          variant="outlined"
          style={{ margin: '10px 0' }}
        >
          Already have an account? Sign In
        </Button>
      </form>
    </div>
  );
}

export default Register;
