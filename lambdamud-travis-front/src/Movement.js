import React from 'react';

class Movement extends React.Component {
	state = {
		input: ''
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { input } = this.state;
		const directions = [ 'n', 'e', 's', 'w' ];
		if (directions.includes(input)) {
			this.props.navigation({ direction: input });
			this.setState({ input: '' });
		} else if (input.includes('/s ') || input.includes('/say ')) {
			let split;
			if (input.includes('/s ')) {
				split = input.split('/s');
			} else if (input.includes('/say ')) {
				split = input.split('/say');
			}
			this.props.say(split[1].trim());
			this.setState({ input: '' });
		} else {
			this.setState({ input: '' });
			alert('Enter n, e, s, w, /s <message>, or /say <message>');
		}
	};

	render() {
		return (
			<div>
				<input name="input" type="text" onChange={this.handleChange} value={this.state.input} />
				<button onClick={this.handleSubmit} type="submit">
					Send
				</button>
			</div>
		);
	}
}

export default Movement;
