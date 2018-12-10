import React, { Component } from 'react';

const Register = props => {
    return (
        <div>
            <h1>Register Form</h1>
            <form onSubmit = {props.registerSubmitHandler}>
                <div>
                    <input
                        type = 'text'
                        name = 'registerUsername'
                        value = {props.registerUsername} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    <input
                        type = 'password'
                        name = 'registerPassword1'
                        value = {props.registerPassword1} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    <input
                        type = 'password'
                        name = 'registerPassword2'
                        value = {props.registerPassword2} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    <button type = 'submit'>Register</button>
                </div>               
            </form>
        </div>
    )
}


export default Register










// // INITIAL DRAFT OF REGISTER COMPONENT
// class Register extends Component {
//     state = {
//         username: '',
//         password1: '', 
//         password2: ''
//     }

//     inputChangeHandler = (e) => {
//         e.preventDefault();
//         const {name, value} = e.target;
//         console.log('name: ', name, 'value: ', value);
//         this.setState({[name]: value})
//     }
  
//     submitHandler = (e) => {
//       e.preventDefault();
//       console.log('state', this.state)

//       axios
//         .post('https://lambdamud-adrianadames.herokuapp.com/api/registration', this.state)
//         .then(res => {
//             const key = res.data['key'];
//             localStorage.setItem('key', key);
//             console.log('Server response: ', key)
//         })
//         .catch(err => {
//             // res.status(500).json({err});
//             console.error('Axios failed')
//         });
//     }

//     render() {
//         return(
//             <div>
//                 <h1> Create Account </h1>
//                 <form onSubmit = {this.submitHandler}>
//                     <div>
//                         <input 
//                             type = 'text'
//                             name = 'username'
//                             value = {this.state.username}
//                             onChange = {this.inputChangeHandler}
//                         />
//                     </div>
//                     <div>
//                         <input 
//                             type = 'password'
//                             name = 'password1'
//                             value = {this.state.password1}
//                             onChange = {this.inputChangeHandler}
//                         />
//                     </div>
//                     <div>
//                         <input 
//                             type = 'password'
//                             name = 'password2'
//                             value = {this.state.password2}
//                             onChange = {this.inputChangeHandler}
//                         />
//                     </div>
//                     <div>
//                         <button type = 'submit'>Create Account</button>
//                     </div>
//                 </form>

//             </div>
//         )
//     }
// }

