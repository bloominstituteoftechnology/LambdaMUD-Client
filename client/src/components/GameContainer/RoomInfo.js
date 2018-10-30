import React,{Fragment} from 'react';
import styled from 'styled-components';


const RoomDetails = styled.div`
        height: 250px;
        width: 200px;
        background: none;
        border: 1px solid black;
	margin-right: 20px;
        font: 25px;
	background: #fff;
        opacity: 0.4;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
        

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
			<p>{this.props.room.title}</p>
			<p>{this.props.room.description}</p>
			
			</RoomDetails>
                );
        
        }
}

export default RoomInfo;
