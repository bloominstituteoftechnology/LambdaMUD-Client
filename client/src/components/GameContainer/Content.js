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

const Text=styled.p`
	color: red;
`

const Description =styled.p`
	color: teal;

`

const Content = (props) => {
    return (
            <Fragment>
	    <ContentStyle>
	    <p>List of Commnads You Can Use:</p>
	    <p>move n for north</p>
	    <p>move s for south</p>
	    <p>move e for east </p>
	    <p>move w for west </p>
	    <Description>{props.room.description}</Description>
	    <Fragment>
	    {props.message.length===0 ? (null) :(<Text>{props.message}</Text>)}
	    </Fragment>
	    <Fragment>
            {props.broadcast.length===0 ? (null) :(<Text>{props.broadcast}</Text>)}
            </Fragment>
	    </ContentStyle>
	    </Fragment>
    );
}

export default Content;
