import React,{Fragment} from 'react';
import styled from 'styled-components';


const ContentStyle = styled.div`
        height: 400px;
        width: 650px;
        background: #fff;
        opacity: 0.5;
        border: 1px solid black;
        font: 25px;
        margin-top: 60px;

`

const Text=styled.div`
	color: red;
`

const Description =styled.p`
	color: teal;

`

const CommandText =styled.p`
	color: green;

`


const Content = (props) => {
    return (
            <Fragment>
	    <ContentStyle>
	    <CommandText>List of Commnads You Can Use:</CommandText>
	    <CommandText>move n to move north</CommandText>
	    <CommandText>move s to move south</CommandText>
	    <CommandText>move e to move east</CommandText>
	    <CommandText>move w to move west</CommandText>
	    <CommandText>say [your message] to broadcast the message to other players</CommandText>
	    <Description>{props.room.description}</Description>
	    <Fragment>
	    {props.error.length===0 ? (null) :(<Text>{props.error}</Text>)}
	    </Fragment>
	    <Fragment>
            {props.broadcast.length===0 ? (null) :(
		     <Text>
		    {props.broadcast.map((message, index)=>{
		    	return(
				<p key={index}>{message}</p>
			)
		    })}</Text>)}
            </Fragment>
	    </ContentStyle>
	    </Fragment>
    );
}

export default Content;
