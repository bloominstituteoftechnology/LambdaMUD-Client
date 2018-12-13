import React from 'react';

const Chatbox = (props) => {
	return (
		<div className="chatbox">
			{props.chat.map((text, index) => (
				<div key={index}>
					{text.title && <p>{text.title}</p>}
					{text.desc && <p>{text.desc}</p>}
					{text.players &&
					text.players.length > 0 && (
						<p>{text.players.length === 1 ? `${text.players} is` : `${text.players.join(', ')} are`} standing here</p>
					)}
					{text.message && <p>{text.message}</p>}
				</div>
			))}
		</div>
	);
};

export default Chatbox;
