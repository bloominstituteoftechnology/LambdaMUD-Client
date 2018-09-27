import React from "react";
import "./App.css";
import Authenticate from "./Authenticate/Authenticate";
import HomePage from "./components/HomePage";

const App = () => <HomePage />;

export default Authenticate(App);
