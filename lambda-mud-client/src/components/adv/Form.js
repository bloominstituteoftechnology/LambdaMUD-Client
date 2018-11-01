import React from 'react';
import {CardActions} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

// This component is for the command input section of the game
// submitHandler is passed down through props
const Form = props => {
    return (
        <CardActions>
            <form onSubmit={(e) => {e.preventDefault(); props.submitHandler()}}>
                <TextField
                    style={{ width: "80%" }}
                    onChange={props.handleInputChange}
                    type="text"
                    name="command"
                    value={props.command}
                    />
                <FlatButton
                    label="Send"
                    className="submit-button"
                    onClick={(e) => {e.preventDefault(); props.submitHandler()}}/>
            </form>
        </CardActions>
        );
    }


export default Form;