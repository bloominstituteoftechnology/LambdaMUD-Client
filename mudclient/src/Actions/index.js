import axios from 'axios';

export const LOGIN = 'LOGIN';
export const LOGGING_IN = 'LOGGING_IN';
export const REGISTER = 'REGISTER';
export const REGISTERING = 'REGISTERING';

export const userLogIn = (credentials) => {
    return dispatch => {
        dispatch(()=>{
            axios
            .post('https://mud-jjashcraft.herokuapp.com/api/login/', credentials)
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data);
            })
        })
    }
}

export const userRegister = (e, credentials) => {
    e.preventDefault();
    return dispatch => {
        dispatch(()=>{
            axios
            .post('https://mud-jjashcraft.herokuapp.com/api/registration/', credentials)
            .then(response => {
                console.log(response);
                localStorage.setItem('token', response.data);
            })
        })
    }
}