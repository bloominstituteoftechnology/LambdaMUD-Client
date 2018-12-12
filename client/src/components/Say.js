// Displays the say form
import React, { Component } from 'react';
import styled from 'styled-components';

const StyledSayForm = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #F5F5F5;
	padding: 10px;
	border-top: 1px solid #DDD;
	input {
		width: 100%;
		padding: 5px;
		border-radius: 5px 0 0 5px;
	}
	.btn {
		background-color: #E6AF5F;
		color: white;
		padding: 5px 10px;
		border-radius: 0 5px 5px 0;
		min-width: 60px;
		&:hover {
			cursor: pointer;
			background-color: #AB701B;
		}
	}
`;

export default class Say extends Component {
	state = { inputText: '' };

	// Takes in the input event and sets inputText in state to its value
	handleInputChange = e => this.setState({ inputText: e.target.value });

	// Sends the inputText in state to the handleSay function,
	// and clears out the state afterwards
	handleSubmit = e => {
		e.preventDefault();
		const say = this.state.inputText;
		this.props.handleSay(say);
		return this.setState({ inputText: '' });
	};

	render() {
		const { inputText } = this.state;
		return(
			<StyledSayForm onSubmit={ this.handleSubmit }>
				<input type='text' placeholder='Say...'
					value={ inputText } onChange={ this.handleInputChange } />
				<button className='btn'>Say</button>
			</StyledSayForm>
		);
	}
}