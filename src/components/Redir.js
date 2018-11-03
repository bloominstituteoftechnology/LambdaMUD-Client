import React from 'react'
import { Redirect } from 'react-router-dom'

class Redir extends React.Component {
  renderRedirect = () => {
    return <Redirect to='/register' />
  }
  
  render () {
    return (
       <div>
        {this.renderRedirect()}
       </div>
    )
  }
}

export default Redir;
