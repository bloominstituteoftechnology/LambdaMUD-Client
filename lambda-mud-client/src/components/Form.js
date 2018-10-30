import React from 'react';

const Form = props => {
    return (
        <div className="input-form">
            <form onSubmit={(e) => {e.preventDefault(); props.submitHandler()}}>
                <input
                    onChange={props.handleInputChange}
                    type="text"
                    name="command"
                    value={props.command}
                    />
                <button
                    className="submit-button"
                    onClick={(e) => {e.preventDefault(); props.submitHandler()}}>
                        Send
                </button>
            </form>
        </div>
        );
    }


export default Form;