import React, { Component } from 'react';
import axios from 'axios';

const header = {
    headers: {
      authorization: `TOKEN ${localStorage.getItem('token')}`
    }
  }
  axios.get('https://lambdam-u-d.herokuapp.com/api/adv/init/', header)
  .then( response => {
    console.log(response)
  })
  .catch(e => console.log(e))


const handleRegister = async (e) => {
  e.preventDefault()
  const user = {
    username: this.state.username,
    password1: this.state.password1,
    password2: this.state.password1,
  }
  try {
    const response = await axios.post('https://.herokuapp.com/api/registration', user)
    localStorage.setItem("token", response.data.key)
    this.setState({
      username: '',
      password1: '',
    })
  } catch (e) {
    console.log(e)
  }
}

class Register extends Component {
  state = {
    username:'',
    password1: '',
    password2: '',
  }

  return (
    <form>
      <input type="text" name="username" />
      <input type="text" name="password" />
      <input type="text" name="password2" />
      <input type="submit" onClick={handleRegister} value="Submit" />
    </form>
  )
}

export default Register