import React from 'react';
import { Redirect } from 'react-router';

const LogoutScreen = () => {
  sessionStorage.clear();
  return <Redirect to="/" />;
};

export default LogoutScreen;
