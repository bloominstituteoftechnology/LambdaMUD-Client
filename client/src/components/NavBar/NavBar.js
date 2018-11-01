import React,{Fragment} from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Nav=styled.div`
        height: 50px;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;

`

const Button=styled.button`
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        color: red;
	font-family: verdana;
`

const NameDiv=styled.div`
	font-size: 18px;
	font-family: verdana;
	

`


class NavBar extends React.Component{
	constructor(props){
		super(props);

	
	}

	logoutHandler=()=>{
        localStorage.removeItem('mud-token');
        this.props.history.push('/login');

	}


	render(){
		return(
			<Nav>
                        <NameDiv>Welcome, {this.props.username}</NameDiv>
                        <Button onClick={this.logoutHandler}>Logout</Button>
                        </Nav>		
		
		);

}

}

export default withRouter(NavBar);
