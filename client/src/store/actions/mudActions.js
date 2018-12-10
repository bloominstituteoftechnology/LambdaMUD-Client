import axios from 'axios';

export const MUD_FETCH_START = 'MUD_FETCH_START';

export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'

export const getMud = () => dispatch => {
    // Add code here
};

export const userLogin = user => dispatch => {
    dispatch({ type: LOGIN_USER_START });

    const endpoint = 'http://localhost:8000/api/login/';
    axios.post(endpoint, user).then(res => {
        console.log(res);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
    }).catch(err => {
        console.log('LOGIN_ERROR', err)
        dispatch({ type: LOGIN_USER_FAILURE, payload: err.response.data.error });
    })
}