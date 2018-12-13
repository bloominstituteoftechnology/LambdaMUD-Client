import React from 'react';

function UserInput(props) {
    return (
        // <form onSubmit={e => (e.preventDefault(), onSubmit}>
        <form onSubmit={props.handleSubmit}>
            <input
            value={props.next_move}
            onChange={props.handleChange}
            placeholder={props.name}
            name={props.name}
            type="text"
            
            />
        </form>
    );
}


export default UserInput
