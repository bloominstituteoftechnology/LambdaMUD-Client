import React from 'react';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';

class Mud extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){

	}



	// extra in case you need to reference

	handleChange = event => {
 	   this.setState({[event.target.name]: event.target.value})
 	 }

	//  <form>
	// 	<input
	// 		type="text"
	// 		placeholder='example'
	// 		onChange={this.handleChange}
	// 		name="example"
	// 		value={this.state.example}
	// 	/>
	// </form>

	render() {

		const token = Object.values(localStorage)

    if (token.length == 0) {
     return (
      <div>
        <Redirect to='/signin'/>
      </div>
      )
    } else {

			return (
				<div>
					<div>Hello MUD!!!!</div>
					<div onClick={() => {localStorage.clear(); window.location.reload();}}><p>Log Out</p></div>
				</div>
			)
		}
	}
}

export default Mud;
