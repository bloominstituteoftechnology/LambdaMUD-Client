import React, { Component } from 'react';


class InputBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            input : '',
        }
    }

    inputHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()

        this.props.handleInput(this.state.input)
        this.setState({ 'input': '' })
    }

    render(){
        <div>
            <form onSubmit={this.submitHandler}>
                <Input type="text"
                        name="input" 
                        placeholder="Enter Command"
                        value={this.state.input} 
                        onChange={this.inputHandler} />
                <button type='submit'>Enter</button>
            </form>
        </div>
  
    }
}