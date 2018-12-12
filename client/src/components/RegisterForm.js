// Displays the register form and a link to the login form
import React from 'react';
import styled from 'styled-components';

const StyledRegisterForm = styled.form`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	border: 1px solid black;
	margin: 5px;
	width: 40%;
	background-color: white;
	h3 {
		padding: 10px;
		border-bottom: 1px solid black;
	}
	input {
		border: 1px solid black;
		padding: 10px 5px;
		margin: 20px 0 0 10px;
		width: 60%;
	}
	.btn {
		border: 1px solid black;
		border-radius: 10px;
		width: 30%;
		padding: 20px 10px;
		margin: 30px 0 0 10px;
		background-color: white;
		&:hover {
			cursor: pointer;
			background-color: #444;
			color: white;
		}
	}
	p {
		margin: 30px 0 10px 0;
		text-align: center;
		span {
			padding: 2.5px 5px;
			&:hover {
				cursor: pointer;
				border-radius: 5px;
				background-color: #444;
				color: white;
			}
		}
	}
`;

const LoginForm = ({ handleRegisterSubmit, toggleForms }) => {
	return(
		<StyledRegisterForm onSubmit = { e => handleRegisterSubmit(e) }>
			<h3>Create Account Screen</h3>
			<input type='text' placeholder='Login'/>
			<input type='password' placeholder='Password'/>
			<input type='password' placeholder='Password again'/>
			<button className='btn' type='submit'>Connect</button>
			<p>Already have an account? <span onClick={ toggleForms }>Log in</span></p>
		</StyledRegisterForm>
	);
};

export default LoginForm;