import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { NEW_ORDER } from '../pusher/constants';
import { subscribe,unsubscribe } from 'pusher-redux';

class App extends Component {
constructor(props, context){
super(props, context);
this.subscribe=this.subscribe.bind(this);
this.unsubscribe=this.unsubscribe.bind(this);
}

componentWillMount(){
this.subscribe();
}

componentWillUnmount(){
this.unsubscribe();
}

  render() {
    return (
      <div className="App">
		
      </div>
    );
  }
}

const map = (state) => {
return({
//x:state.x
})
}

export default connect(map)(App);
