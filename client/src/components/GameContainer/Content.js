import React,{Fragment} from 'react';
import styled from 'styled-components';


const ContentStyle = styled.div`
        height: 250px;
        width: 500px;
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
	    <ContentStyle><Description>Welcome, {props.room.description}</Description>
	    <Fragment>
	    {props.message.length===0 ? (null) :(<Text>{props.message}</Text>)}
	    </Fragment>
	    </ContentStyle>
	    </Fragment>
    );
}

export default Content;
