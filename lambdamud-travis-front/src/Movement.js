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
		} else if (input.includes('/s ')) {
			let split;
			if (input.includes('/s ')) {
				split = input.split('/s');
			}
			this.props.say(split[1].trim());
			this.setState({ input: '' });
		} else {
			this.setState({ input: '' });
			alert('Enter n, e, s, w to head a direction. To message, type /s <message>');
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
