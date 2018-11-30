import React from 'react';
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Window from "./Components/Window";
import { Route } from "react-router-dom";
import "./style.css";

const App = () => (
  <div className="app">
    <Route path="/api/registration" component={ SignUp } />
    <Route path="/api/login" component={ Login } />
    <Route path="/api/adv/init" component={ Window } />
  </div>
);

export default App;
