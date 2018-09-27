import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  number,
  array,
  object
} from '@storybook/addon-knobs';

import { TextField, Button } from '@material-ui/core/';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

const stories = storiesOf('Storybook Knobs', module);
stories.addDecorator(withKnobs);

const state = {
  username: undefined,
  password: undefined
};

const handleChange = name => event => {
  console.log(name);
  console.log(event.target.value);
  console.log(state[name]);
  state[name] = event.target.value;
  console.log(state[name]);
};

stories.add('input', () => (
  <form>
    <TextField
      type="password"
      id="login-password"
      label="Password"
      value={state.password}
      margin="normal"
      variant="outlined"
      onChange={handleChange('password')}
    />
  </form>
));
