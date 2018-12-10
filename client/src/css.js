import styled from 'styled-components';

export const Contain = styled.div`
	max-width: 500px;
	margin: 80px auto;
	border: solid black 1px;
	background-color: lightblue;
	margin-bottom: 20px;
`
export const MainH1 = styled.h1`
	text-align: center;
	font-size: 20px
`
export const FlexForm = styled.form`
	display: flex;
	flex-direction: column;
	margin: 20px 10%;
	border: 1px solid blue;
`

export const BTN = styled.button`
	border: solid green 1px;
	background-color: lightgreen;
	&:hover {
		background-color: green;
		color:lightgreen;
		cursor: pointer;
	}
`
export const SubmitBtn = styled.button`
	&:hover {
		cursor: pointer
		background-color: lightgrey;
		border: solid grey 1px;
	}
`
export const BTNDiv = styled.div`
	display: flex;
	justify-content: center;
`

export const Errors = styled.div`
	max-width: 500px;
	margin: 80px auto;
	color: red;
	font-size: 1.3rem;
	margin-top: 20px;
	line-height: 1.6;
`;

export const LogErr = styled.p`
	text-align: center;
	margin-top: 20px;
	color: red;
`;

export const Chatbox = styled.div`
	background-color: white;
	height: 200px;
	border: 1px solid black;
	margin: 0 3% 0 3%;
	font-size: 1.6rem;
	line-height: 1.3;
`

export const PanelDiv = styled.div`
	display:flex;
	justify-content: center;
	align-items: center;
`

export const InstrcDiv = styled.div`
	border: solid black 1px;
	font-size: 1.4rem;
	margin-right: 2%;
	padding: 3%;
	background-color: #f5f5f5;
`








