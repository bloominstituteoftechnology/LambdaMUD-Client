import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './component/login/Login'
import Header from './component/header/Header'
import Footer from './component/footer/Footer'

function App() {
  return (
    <div className="App">
      <>
        <Header />
        <h1>Hello from the APP!!</h1>
        <header className="App-header">
          <Switch>
          <Route exact path="/login" component={Login} />
          <Login/>
          </Switch>
        </header>
        <Footer />
      </>
    </div>
  );
}

export default App;