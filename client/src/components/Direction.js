// Displays a direction
import React from 'react';
import styled from 'styled-components';

const StyledDirection = styled.div`
	border-radius: 5px;
	background-color: #4C4C4C;
	color: white;
	height: 20px;
	width: 20px;
	margin: 5px;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		cursor: pointer;
		background-color: #222;
	}
`;

const Direction = ({ direction, handleMove }) => {
	return(
		<StyledDirection onClick = { e => handleMove(direction) }>
			{ direction.toUpperCase() }
		</StyledDirection>
	);
};

export default Direction;