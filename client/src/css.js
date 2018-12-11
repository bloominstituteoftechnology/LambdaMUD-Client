import styled from 'styled-components';
import tile from './components/Mud/img/t.jpg';
import g from './components/Mud/img/g.jpg'

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
  background-color: #191919;
  height: 120px;
  border: 1px solid black;
  margin: 0 3% 0 3%;
  font-size: 1.6rem;
  line-height: 1.3;
  margin-top: 20px;
  overflow: scroll;
  color: white;
`

export const PanelDiv = styled.div`
	border-top: solid black 1px;
`

export const InstrcDiv = styled.div`
	font-size: 1.4rem;
	padding: 3%;
	background-color: #e8e7e7;
`
export const SubH2 = styled.h2`
	text-align: center;
	font-size: 20px;
	background-color: #e8e7e7;
	padding-top: 5px;
`
export const SubH2Chat = styled.h2`
	text-align: center;
	font-size: 20px;
	padding-top: 5px;
	color: white;
	margin-top: 10px;
	> p {
    background-color: #22304e;
    display: inline;
    padding: .5%;
    padding-top: 3px;
    border-radius: 5px;
	}
`

export const ContainMud = styled.div`
	max-width: 600px;
	margin: 20px auto;
	border: solid black 1px;
	background-image: url(${tile});
	background-repeat: repeat;
	margin-bottom: 20px;
`

export const DungeonDiv = styled.div`
	height: 90px;
	background-image: url(${g});
	background-repeat: repeat;
	> h2 {
		font-size: 1.8rem;
		text-align: center;
		padding: 5px 0;
	}
	> div {
		padding-left: 3%;
		font-size: 1.6rem;
	}
`

export const BTNLog = styled.button`
	border: solid green 1px;
	background-color: lightgreen;
  border-radius: 1px;
  font-size: 2rem;
  border-radius: 4px;
	&:hover {
		background-color: green;
		color:lightgreen;
		cursor: pointer;
	}
`
export const BTNWrapper = styled.div`
	max-width: 600px;
	margin: 0 auto;
`








