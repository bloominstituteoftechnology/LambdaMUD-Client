import React,{Fragment} from 'react';
import styled from 'styled-components';


const RoomDetails = styled.div`
        height: 400px;
        width: 200px;
        background: none;
        border: 1px solid black;
	margin-right: 20px;
        font: 25px;
	background: #fff;
        opacity: 0.4;
	display: flex;
	flex-direction: column;
	//justify-content: center;
	//align-items: center;
        

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
			<div>{this.props.players.length===0 ? (null):(
			<Fragment>
			<p>Palyer List</p>	
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
