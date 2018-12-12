// Displays the header
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
	h1 {
		text-align: center;
		font-size: 1.6rem;
		padding: 20px 0 20px 0;
		color: white;
	}
`;

const Header = () => {
	return(
		<StyledHeader>
			<h1>Adventure Game</h1>
		</StyledHeader>
	);
};

export default Header;