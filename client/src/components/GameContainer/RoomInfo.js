import React,{Fragment} from 'react';
import styled from 'styled-components';


const RoomDetails = styled.div`
        min-height: 400px;
        width: 200px;
        background: none;
        border: 1px solid black;
	border-radius: 8px;
	margin-right: 20px;
        font: 25px;
	background: #fff;
        opacity: 0.4;
	display: flex;
	flex-direction: column;
	-webkit-backface-visibility: hidden;
	//-webkit-transform: translate3d(0, 0, 0);
        

`
class RoomInfo extends React.Component{
        constructor(props){
                super(props);
                this.state={}
        }

        render(){
                return( 
                        <RoomDetails>
			<p>Room Details</p>
			<p>Name: {this.props.room.title}</p>
			<div>{this.props.players.length===0 ? (<p>No other players in this room</p>):(
			<Fragment>
			<p>Player List:</p>	
			<Fragment>
			{this.props.players.map((player, index) => {
				return(
				<div key={index}>
				<p>{player}</p>
				</div>
				)
			})}</Fragment>
			</Fragment>)}</div>

			</RoomDetails>
                );
        
        }
}

export default RoomInfo;
