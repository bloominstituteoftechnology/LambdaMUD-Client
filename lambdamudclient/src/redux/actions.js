import axios from 'axios';

export const REGISTERING = 'REGISTERING';
export const REGISTERED = 'REGISTERED';
export const LOGGINGIN = 'LOGGINGIN';
export const LOGGEDIN = 'LOGGEDIN';
export const INITIALIZING = 'INITIALIZING';
export const INITIALIZED = 'INITIALIZED';
export const MOVING = 'MOVING';
export const MOVED ='MOVED';

export const register = registration => {
    return dispatch => {
        dispatch({type:REGISTERING})
            axios
                .post('https://kev-adv.herokuapp.com/api/registration/', registration)
                .then(response => {
                    localStorage.setItem('token',response.data['key'])
                    dispatch({type: REGISTERED, payload: response.data['key']})
                })
                .catch(error => console.error(error.response));
    }
}

export const login = credentials => {
    return dispatch => {
        dispatch({type:LOGGINGIN})
            axios
                .post('https://kev-adv.herokuapp.com/api/login/', credentials)
                .then(response => {
                    localStorage.setItem('token',response.data['key'])
                    dispatch({type: LOGGEDIN, payload: response.data['key']})
                })
                .catch(error => console.error(error.response));
    }
}

export const init = () => {
    return dispatch => {
        dispatch({type: INITIALIZING})
            axios
                .get('https://kev-adv.herokuapp.com/api/adv/init/', {headers: {Authorization: 'Token '.concat(localStorage.getItem('token'))}})
                .then(response => {
                    console.log(response);
                    dispatch({type: INITIALIZED, payload: response.data})
                })
                .catch(error => console.error(error.response));
    }
}

export const move = input => {
    return dispatch => {
        dispatch({type: MOVING})
            axios
                .post('https://kev-adv.herokuapp.com/api/adv/move/', {'direction':input}, {headers: {Authorization: 'Token '.concat(localStorage.getItem('token'))}})
                .then(response => {
                    console.log(response);
                    dispatch({type: MOVED, payload: response.data})
                })
                .catch(error => console.error(error.response));
    }
}