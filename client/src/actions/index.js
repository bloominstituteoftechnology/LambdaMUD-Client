import axios from 'axios';

export const REGISTERING = 'REGISTERING';
export const REGISTERED = 'REGISTERED';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';

export const ERROR = 'ERROR';


export const register = (user) => {
    const sendUserRegistration = axios.post(`http://localhost:8000/api/registration/`, user);

    return dispatch => {
        dispatch({type: REGISTERING});

        sendUserRegistration.then(res => {
            console.log(`response for register:${res.data}`)
            if(res.status == 201){
                localStorage.setItem('jwt', res.data.key);
                dispatch({type: REGISTERED, payload: res.data})
            } else {
                dispatch({type: REGISTER_FAILURE})
            }
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}