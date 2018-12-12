import axios from 'axios';

export const REGISTERING = 'REGISTERING';
export const REGISTERED = 'REGISTERED';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGING_OUT = 'LOGGING_OUT';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const INITIALIZING = 'INITIALIZING';
export const INITIALIZED = 'INITIALIZED';

export const MOVING = 'MOVING';
export const MOVED = 'MOVED';

export const ERROR = 'ERROR';


export const register = (user) => {
    const sendUserRegistration = axios.post(`http://localhost:8000/api/registration/`, user);

    return dispatch => {
        dispatch({type: REGISTERING});

        sendUserRegistration.then(res => {
            console.log(`response for register:${res.data}`)
            console.log(`res.status:${res.status}`)
            if(res.status == 201){
                console.log(`key:${res.data.key}`)
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

export const login = (user) => {
    const sendUserLogin = axios.post(`http://localhost:8000/api/login/`, user);

    return dispatch => {
        dispatch({type: LOGGING_IN});

        sendUserLogin.then(res => {
            localStorage.setItem('jwt', res.data.key);

            dispatch({type: LOGGED_IN, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: LOGIN_FAILURE})
        })
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({type: LOGGING_OUT});

        localStorage.removeItem('jwt');

        dispatch({type: LOGGED_OUT});

        window.location.reload();
    }
}

export const initialize = (token) => {
    const sendToken = axios.get(`http://localhost:8000/api/adv/init/`, {headers: {'Authorization' : 'Token ' + token}})

    return dispatch => {
        dispatch({type: INITIALIZING})

        sendToken.then(res => {
            console.log(res.data)
            dispatch({type: INITIALIZED, payload: res.data})
        }).catch(err => {
            console.log(err)
            dispatch({type: ERROR})
        })
    }
}

export const move = (token, direction) => {
    const sendMove = axios.post(`http://localhost:8000/api/adv/move/`, {'direction': direction}, {headers: {'Authorization' : 'Token ' + token}})

    return dispatch => {
        dispatch({type: MOVING})

        sendMove.then(res => {
            console.log(res.data)
            dispatch({type: MOVED, payload: res.data})
        }).catch(err => {
            console.log(err)
            dispatch({type: ERROR})
        })
    }
}