import React from "react";
import InputComponent from "./InputComponent";
import axios from 'axios';

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://charles-mud.herokuapp.com',
      headers: {'Authorization': 'Token ' + localStorage.getItem('key')}
    }
  }

  componentDidMount() {
    const init = this.state.url + '/api/adv/init'
    const auth = 'Token '.concat(localStorage.getItem('key'));
    axios.get(init, { headers: { Authorization: auth } })
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="textwindow">
        <p>window stuff</p>
        <InputComponent />
      </div>
    );
  }
}

export default Window;
