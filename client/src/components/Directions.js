// Displays all the directions using Direction components
import React from 'react';
import styled from 'styled-components';
import { Direction } from './index.js';

const StyledDirections = styled.div`
	.direction-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		.empty-div {
			width: 30px;
		}
	}
`;

const Directions = ({ handleMove }) => {
	return(
		<StyledDirections>
			<div className = 'direction-wrapper'>
				<Direction
					direction = { 'n' }
					handleMove = { handleMove }
				/>
			</div>
			<div className = 'direction-wrapper'>
				<Direction
					direction = { 'w' }
					handleMove = { handleMove }
				/>
				<div
					// empty div to create space between W and E directions
					className = 'empty-div'
				/>
				<Direction
					direction = { 'e' }
					handleMove = { handleMove }
				/>
			</div>
			<div className = 'direction-wrapper'>
				<Direction
					direction = { 's' }
					handleMove = { handleMove }
				/>
			</div>
		</StyledDirections>
	);
};

export default Directions;