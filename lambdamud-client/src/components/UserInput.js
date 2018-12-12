import React from 'react';

function PasswoUserInputrdForm(props) {
    return (
        <form>
            <input
            value={props.password}
            onChange={props.handleChange}
            placeholder={props.name}
            name={props.name}
            type="password"
            />
        </form>
    );
}


export default UserInput
