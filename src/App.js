import React from "react";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Window from "./Components/Window";
import FrontPage from "./Components/FrontPage"
import { Route } from "react-router-dom";
import "./styles/style.css";

const App = () => (
  <div className="app">
    <Route exact path="/" component={FrontPage} />
    <Route path="/api/registration" component={SignUp} />
    <Route path="/api/login" component={Login} />
    <Route path="/api/adv/init" component={Window} />
    <Route path="/api/adv/move" component={ Window } />
  </div>
);

export default App;
