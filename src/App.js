import React from "react";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Window from "./Components/Window";
import FrontPage from "./Components/FrontPage";
import FourOhFour from './Components/404';
import { Route, Switch } from "react-router-dom";
import "./styles/style.css";

const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/" component={FrontPage} />
      <Route path="/api/registration" component={SignUp} />
      <Route path="/api/login" component={Login} />
      <Route path="/api/adv/init" component={Window} />
      <Route path="/api/adv/move" component={Window} />
      <Route path="/api/adv/say" component={Window} />
      {/* default route for unknown urls */}
      <Route component={FourOhFour} />
    </Switch>
  </div>
);

export default App;
