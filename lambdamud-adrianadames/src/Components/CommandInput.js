import React, {Component} from 'react';
import styled from 'styled-components';


// class CommandInput extends Component {
//     constructor(props) {
//         super();
//         this.state = {
//             commandInput: '',
//             errorMessage: ''
//         }
//     }

//     componentDidMount() {

//     }


//     // need to make a function here that will fire off then the user presses enter or clicks on submit
    
//     // if the commandInput is a move command, utilize the moveSubmitHandler 
//     // if the commandInut is a say command, utilize the saySubmitHandler

//     commandSubmitHandler = (commandInput) => {
//         let moveCommandRegex = new RegExp('(?<=\/m |\/move ).*');
//         let sayCommandRegex = new RegExp('(?<=\/s |\/say ).*');

//         if (commandInput.match(moveCommandRegex)) {
//             let moveDirection = commandInput.match(moveCommandRegex)[0];
//             let validDirections = ['n', 'north', 'e', 'east', 's', 'south', 'w', 'west'];

//             if (validDirections.includes(moveDirection.toLowerCase())) {
//                 console.log('valid move direction: ', moveDirection);
//                 // this.props.moveSubmitHandler();
//             } else {
//                 console.log('invalid move direction: ', moveDirection)
//                 this.setState({errorMessage:'Invalid move direction: ', moveDirection})
//             }

//             // return commandInput.match(moveCommandRegex)[0]
//         }

//         if (commandInput.match(sayCommandRegex)) {
//             return commandInput.match(sayCommandRegex)[0]
//         }

//         // let moveCommandRegex = new RegExp('/^\/m|\/move/');
//         // let sayCommandRegex = new RegExp('/^\/s|\/say/');

//         // if moveTextRegex result isn't null, user entered a move command
//         // if sayTextRegex result isn't null, user enterd a say command

//     }

//     render() {
//         return(
//             <CommandInputContainerStyledDiv>
//                 <div>Command Input (?):</div>
//                 <form onSubmit = {this.props.moveSubmitHandler}>
//                         <input 
//                             type = 'text'
//                             name = 'direction'
//                             value = {this.props.direction}
//                             onChange = {this.props.inputChangeHandler}
//                         />
//                         <button onClick = {this.props.moveSubmitHandler} type = 'submit'> MOVE </button>
//                 </form>
                

//             </CommandInputContainerStyledDiv>
//         )
//     }


// }

const CommandInput = props => {
    return (
        <CommandInputContainerStyledDiv>
            <div>Command Input (?):</div>
            <form onSubmit = {props.commandInputSubmitHandler}>
                <div>
                    <input 
                        type = 'text'
                        name = 'commandInput'
                        value = {props.commandInput}
                        onChange = {props.inputChangeHandler}
                    />
                    <button onClick = {props.commandInputSubmitHandler} type = 'submit'> Submit </button>
                </div>
            </form>
        </CommandInputContainerStyledDiv>
            
    )
}


// const CommandInput = props => {
//     return (
//         <>
//         <CommandInputContainerStyledDiv>
//             Command Input (?):
//         </CommandInputContainerStyledDiv>
//         <div>
//             <form onSubmit = {props.commandInputSubmitHandler}>
//                 <div>
//                     <input 
//                         type = 'text'
//                         name = 'direction'
//                         value = {props.direction}
//                         onChange = {props.inputChangeHandler}
//                     />
//                     <button onClick = {props.commandInputSubmitHandler} type = 'submit'> MOVE </button>
//                 </div>
//             </form>
            
            
//             <form onSubmit = {props.saySubmitHandler}>
//                 <div>
//                     <input 
//                         type = 'text'
//                         name = 'sayText'
//                         value = {props.sayText}
//                         onChange = {props.inputChangeHandler}
//                     />
//                     <button onClick = {props.saySubmitHandler} type = 'submit'> SAY </button>
//                 </div>
//             </form>
//         </div>
//         </>
//     )
// }

const CommandInputContainerStyledDiv = styled.div`
  margin:5px;
  border:1px solid green;
`

export default CommandInput; 

