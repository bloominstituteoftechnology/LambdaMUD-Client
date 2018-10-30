import React,{Fragment} from 'react';
import styled from 'styled-components';


const PlayerName = styled.div`
	height: 250px;
	width: 200px;
	background: #fff;
	opacity: 0.4;
	border: 1px solid black;
	font: 25px;
	color: black;
	margin-right: 20px;
	

`



class PlayerInfo extends React.Component{
	constructor(props){
		super(props);
		this.state={}
	}


	render(){
		return(
			<PlayerName>{this.props.user.username}</PlayerName>
		);
	
	}
}

export default PlayerInfo;
