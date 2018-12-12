// Displays the adventure entries, the say input, and the error messages
import React, { Component } from 'react';
import styled from 'styled-components';
import { AdventureHeader, AdventureEntry, Say, Shout } from './index.js';

const StyledAdventure = styled.div`
	border: 1px solid #467AB3;
	border-radius: 5px;
	width: 60%;
	background-color: white;
	.adventure-entries {
		max-height: 40vh;
		overflow: auto;
		.dummy-div {
			float: left;
			clear: both;
		}
	}
	.error-msg {
		text-align: center;
		padding-bottom: 5px;
	}
`;

export default class Adventure extends Component {
	scrollElem = null;
	
	// smoothly scrolls the element into view
	scrollToBottom = () => this.scrollElem.scrollIntoView({ behavior: 'smooth' });

	// scrolls to the bottom every time the component gets updated
	componentDidUpdate() { this.scrollToBottom() };

	render() {
		const {
			name,
			adventureEntries,
			error_msg,
			toggleWhisper,
			handleLogout,
			handleSay,
			handleShout,
		} = this.props;
		return(
			<StyledAdventure>
				<AdventureHeader
					name = { name }
					toggleWhisper = { toggleWhisper }
					handleLogout = { handleLogout }
				/>
				<div className = 'adventure-entries'>
					{ adventureEntries.map((entry, i) =>
						<AdventureEntry
							key = { i }
							entry = { entry }
						/>
					) }
					<div
						// dummy div to scroll to bottom of adventure entries
						className = 'dummy-div'
						ref = { e => { this.scrollElem = e } }
					/>
				</div>
				<Say handleSay = { handleSay } />
				<Shout handleShout = { handleShout } />
				<p className = 'error-msg'>{ error_msg }</p>
			</StyledAdventure>
		);
	}
};