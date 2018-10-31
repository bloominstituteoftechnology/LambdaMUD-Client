import React from 'react';
import {CardActions} from 'material-ui/Card';

const Form = props => {
    return (
        <CardActions>
            <form onSubmit={(e) => {e.preventDefault(); props.submitHandler()}}>
                <input
                    style={{ width: "80%" }}
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
        </CardActions>
        );
    }


export default Form;