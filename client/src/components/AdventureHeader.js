// Displays a header type of component for Adventure component
import React from 'react';
import styled from 'styled-components';

const StyledAdventureHeader = styled.div`
	padding: 5px 10px;
	background-color: #467AB3;
	color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	span {
		i {
			margin-right: 5px;
		}
	}
	.btn {
		margin-left: 10px;
		border-radius: 5px;
		color: white;
		padding: 5px 10px;
		&:hover {
			cursor: pointer;
		}
	}
	.logout-btn {
		border: 1px solid #DA4167;
		background-color: #DA4167;
		&:hover {
			border: 1px solid #982D48;
			background-color: #982D48;
		}
	}
	.whisper-btn {
		border: 1px solid #886176;
		background-color: #886176;
		&:hover {
			border: 1px solid #6A4C5C;
			background-color: #6A4C5C;
		}
	}
`;

const AdventureHeader = ({ name, handleLogout, toggleWhisper }) => {
	return(
		<StyledAdventureHeader>
			<span><i className = 'fas fa-comment-alt' />Adventure</span>
			<div>
				<span>{ name }</span>
				<button className = 'btn whisper-btn' onClick = { toggleWhisper }>Whisper</button>
				<button className = 'btn logout-btn' onClick = { handleLogout }>Log Out</button>
			</div>
		</StyledAdventureHeader>
	);
};

export default AdventureHeader;