import React from 'react';

function PasswordForm(props) {
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


export default PasswordForm
