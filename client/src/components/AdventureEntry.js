// Displays title, description, players, and chat
import React from 'react';
import styled from 'styled-components';
import { Chat } from './index.js';

const StyledAdventureEntry = styled.div`
	p {
		padding: 5px 10px;
	}
	.players {
		color: #509140;
	}
	hr {
		width: 95%;
	}
`;

const AdventureEntry = ({ entry }) => {
	const { title, description, players, chat } = entry;
	return(
		<StyledAdventureEntry>
			<p>{ title }</p>
			<p>{ description }</p>
			{
				players.length > 0 &&
				<p className = 'players'>{ players.length === 1 ? `${players} is` : `${players.join(', ')} are` } standing here</p>
			}
			<Chat chat = { chat } />
			<hr />
		</StyledAdventureEntry>
	);
};

export default AdventureEntry;