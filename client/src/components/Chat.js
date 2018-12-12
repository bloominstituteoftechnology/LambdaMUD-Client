// Displays chat messages
import React from 'react';
import styled from 'styled-components';

const StyledChat = styled.div`
	p {
		color: #DA4167;
	}
`;

const Chat = ({ chat }) => {
	return(
		<StyledChat>
			{ chat.map((msg, i) => <p key = { i }>{ msg }</p>) }
		</StyledChat>
	);
};

export default Chat;