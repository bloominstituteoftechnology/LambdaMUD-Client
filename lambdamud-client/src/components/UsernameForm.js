import React from 'react';

function UsernameForm(props) {
  return (
      <form>
          <input
           value={props.username}
           onChange={props.handleChange}
           placeholder='username'
           name="username" />
      </form>
  );
}


export default UsernameForm
