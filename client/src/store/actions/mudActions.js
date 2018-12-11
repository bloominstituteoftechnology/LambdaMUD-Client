import axios from 'axios';

export const MUD_FETCH_START = 'MUD_FETCH_START';

export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const REGISTER_USER_START = 'LOGIN_USER_START';
export const REGISTER_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const GET_USER_START = 'GET_USER_START';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_BIND = 'SET_BIND';
export const SET_MESSAGE = 'SET_MESSAGE';

export const getMud = () => dispatch => {
    // Add code here
};

export const registerUser = user => dispatch => {
    dispatch({ type: REGISTER_USER_START });

    const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/registration/';
    axios.post(endpoint, user)
        .then(res => {
            console.log('REGISTER', res);
            dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data });
        })
        .catch(err => {
            const error = err.response.data;
            const error2 = error[Object.keys(error)[0]]

            dispatch({ type: REGISTER_USER_FAILURE, payload: error2 });
        });

}

export const userLogin = user => dispatch => {
    dispatch({ type: LOGIN_USER_START });

    // const endpoint = 'http://localhost:8000/api/login/';
    const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/login/'
    axios.post(endpoint, user).then(res => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
    }).catch(err => {
        const error = err.response.data;
        const error2 = error[Object.keys(error)[0]]

        dispatch({ type: LOGIN_USER_FAILURE, payload: error2 });
    })


}

export const logoutUser = () => dispatch => {
    dispatch({ type: LOGOUT_USER });

}

export const getUser = () => dispatch => {
    dispatch({ type: GET_USER_START });

    // const endpoint = 'http://localhost:8000/api/adv/init/';
    const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/adv/init/'
    let token = localStorage.getItem('key');

    let config = {
        headers: {
            Authorization: `Token ${token}`
        }
    }

    axios.get(endpoint, config).then(res => {

        dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    }).catch(err => {
        dispatch({ type: GET_USER_FAILURE, payload: err.response });
    })
}

export const clearError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR });
}

export const setBind = (bool) => dispatch => {
    dispatch({ type: SET_BIND, payload: bool });
}

export const setMessage = (message) => dispatch => {
    dispatch({ type: SET_MESSAGE, payload: message })
}