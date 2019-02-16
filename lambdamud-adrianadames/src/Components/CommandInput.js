import React from 'react';

const CommandInput = props => {
    return (
        <div>
            <form onSubmit = {props.moveSubmitHandler}>
                <div>
                    <input 
                        type = 'text'
                        name = 'direction'
                        value = {props.direction}
                        onChange = {props.inputChangeHandler}
                    />
                    <button onClick = {props.moveSubmitHandler} type = 'submit'> MOVE </button>
                </div>
            </form>
            <form onSubmit = {props.saySubmitHandler}>
                <div>
                    <input 
                        type = 'text'
                        name = 'sayText'
                        value = {props.sayText}
                        onChange = {props.inputChangeHandler}
                    />
                    <button onClick = {props.saySubmitHandler} type = 'submit'> SAY </button>
                </div>
            </form>
        </div>
    )
}


export default CommandInput; 