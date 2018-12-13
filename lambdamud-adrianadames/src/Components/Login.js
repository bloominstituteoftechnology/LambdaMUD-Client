import React, { Component } from 'react';

const Login = props => {
    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit = {props.loginSubmitHandler}>
                <div>
                    <input
                        type = 'text'
                        name = 'loginUsername'
                        value = {props.loginUsername} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    <input
                        type = 'password'
                        name = 'loginPassword'
                        value = {props.loginPassword} 
                        onChange = {props.inputChangeHandler}
                    />
                </div>
                <div>
                    <button type = 'submit'>Login</button>
                </div>
            </form>
            <form onSubmit= {props.initializeSubmitHandler}> 
                <div>
                    <input />
                    <button onClick= {props.initializeSubmitHandler}  type = 'submit'>Initialize</button>
                </div>
            </form>
            <form onSubmit= {props.moveSubmitHandler}> 
                <div>
                    <input 
                        type = 'text'
                        name = 'direction'
                        value = {props.direction}
                        onChange = {props.inputChangeHandler}
                    />
                    <button onClick= {props.moveSubmitHandler}  type = 'submit'>Move</button>
                </div>
            </form>
            <form onSubmit= {props.saySubmitHandler}> 
                <div>
                    <input 
                        type = 'text'
                        name = 'sayText'
                        value = {props.sayText}
                        onChange = {props.inputChangeHandler}
                    />
                    <button onClick= {props.saySubmitHandler}  type = 'submit'>Say</button>
                </div>
            </form>
        </div>
    )
}


export default Login









// // INITIAL DRAFT OF LOGIN COMPONENT
// class Login extends Component {
//     state = {
//         username: '', 
//         password: ''
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
//         .post('https://lambdamud-adrianadames.herokuapp.com/api/login', this.state)
//         .then(res => {
//             // const key = res.data['key'];
//             // localStorage.setItem('key', key);
//             // console.log('Server response: ', key)
//             console.log('Server response: ', res)
//         })
//         .catch(err => {
//             // res.status(500).json({err});
//             console.error('Axios failed')
//         });
//     }

//     render() {
//         return(
//             <div>
//                 <h1> Login </h1>
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
//                             name = 'password'
//                             value = {this.state.password}
//                             onChange = {this.inputChangeHandler}
//                         />
//                     </div>

//                     <div>
//                         <button type = 'submit'>Login</button>
//                     </div>
//                 </form>

//             </div>
//         )
//     }



// }

// export default Login