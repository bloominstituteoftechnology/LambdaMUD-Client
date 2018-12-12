// Displays the shout form
import React, { Component } from 'react';
import styled from 'styled-components';

const StyledShoutForm = styled.form`
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
		background-color: #6CD821;
		color: white;
		padding: 5px 10px;
		border-radius: 0 5px 5px 0;
		min-width: 60px;
		&:hover {
			cursor: pointer;
			background-color: #408013;
		}
	}
`;

export default class Shout extends Component {
	state = { inputText: '' };

	// Takes in the input event and sets inputText in state to its value
	handleInputChange = e => this.setState({ inputText: e.target.value });

	// Sends the inputText in state to the handleShout function,
	// and clears out the state afterwards
	handleSubmit = e => {
		e.preventDefault();
		const shout = this.state.inputText;
		this.props.handleShout(shout);
		return this.setState({ inputText: '' });
	};

	render() {
		const { inputText } = this.state;
		return(
			<StyledShoutForm onSubmit = { this.handleSubmit }>
				<input type='text' placeholder='Shout...'
					value={ inputText } onChange={ this.handleInputChange }/>
                <button className='btn'>Shout</button>
			</StyledShoutForm>
		);
	}
};