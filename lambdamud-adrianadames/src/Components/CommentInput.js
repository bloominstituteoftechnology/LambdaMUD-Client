import React from 'react';

const CommentInput = props => {
    return(
        <form onSubmit = {props.addComment()}>
            <div>
                <input 
                    type = 'text'
                    name = 'Enter comment'
                    value = {props.commentInput}
                    onChange = {props.addCommentHandler}
                />
            </div>
            <div>
                <button type = 'submit'>Submit comment</button>
            </div>
        </form>
    )
}

export default CommentInput;