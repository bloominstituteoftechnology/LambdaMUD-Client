import axios from 'axios';
import pusher from 'pusher';

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

export const SAYING = 'SAYING';
export const SAID = 'SAID';

export const ERROR = 'ERROR';

export const register = (newUser) => {
    console.log(newUser)
    const sendUserRegistration = axios.post(`https://acr-lambda-mud.herokuapp.com/api/registration/`, newUser);

    return dispatch => {
        dispatch({type: REGISTERING});

        sendUserRegistration.then(res => {
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

export const login = (user) => {
    const sendUserLogin = axios.post(`https://acr-lambda-mud.herokuapp.com/api/login/`, user);

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
        localStorage.removeItem('uuid');

        dispatch({type: LOGGED_OUT});

        window.location.href = '/'
    }
}

export const initialize = (token) => {
    const sendToken = axios.get(`https://acr-lambda-mud.herokuapp.com/api/adv/init/`, {headers: {'Authorization' : 'Token ' + token}})

    return dispatch => {
        dispatch({type: INITIALIZING})

        sendToken.then(res => {
            // console.log(res.data)
            localStorage.setItem('uuid', res.data.uuid)


            dispatch({type: INITIALIZED, payload: res.data})
        }).catch(err => {
            console.log(err)
            dispatch({type: ERROR})
        })
    }
}

export const move = (token, direction) => {
    const sendMove = axios.post(`https://acr-lambda-mud.herokuapp.com/api/adv/move/`, {'direction': direction}, {headers: {'Authorization' : 'Token ' + token}})

    return dispatch => {
        dispatch({type: MOVING})

        sendMove.then(res => {
            // console.log(res.data)
            dispatch({type: MOVED, payload: res.data})
        }).catch(err => {
            console.log(err)
            dispatch({type: ERROR})
        })
    }
}

export const say = (token, message) => {
    const sendSay = axios.post(`https://acr-lambda-mud.herokuapp.com/api/adv/say/`, {'message': message}, {headers: {'Authorization' : 'Token ' + token}})

    return dispatch => {
        dispatch({type: SAYING})

        sendSay.then(res => {
            // console.log(res.data)
            dispatch({type: SAID})
        }).catch(err => {
            console.log(err)
            dispatch({type: ERROR})
        })
    }
}

export const shout = (token, message) => {
    const sendShout = axios.post(`https://acr-lambda-mud.herokuapp.com/api/adv/shout/`, {'message': message}, {headers: {'Authorization' : 'Token ' + token}})

    return dispatch => {
        dispatch({type: SAYING})

        sendShout.then(res => {
            console.log(res.data)
            dispatch({type: SAID})
        }).catch(err => {
            console.log(err)
            dispatch({type: ERROR})
        })
    }
}