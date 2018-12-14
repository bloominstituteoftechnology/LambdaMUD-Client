import axios from 'axios';

// Export each action
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

export const MOVE_USER_START = 'MOVE_USER_START';
export const MOVE_USER_SUCCESS = 'MOVE_USER_SUCCESS';
export const MOVE_USER_FAILURE = 'MOVE_USER_FAILURE';

export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_BIND = 'SET_BIND';
export const SET_MESSAGE = 'SET_MESSAGE';

export const getMud = () => dispatch => {
    // Add code here
};

// Registers a new user
export const registerUser = user => dispatch => {
    dispatch({ type: REGISTER_USER_START });

    const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/registration/';

    axios.post(endpoint, user)
        .then(res => {
            dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data });
        })
        .catch(err => {
            const error = err.response.data;
            const error2 = error[Object.keys(error)[0]]

            if(localStorage.getItem('key')) {
                localStorage.removeItem('key');
            };
            if(localStorage.getItem('pusherTransportTLS')) {
                localStorage.removeItem('pusherTransportTLS')
            }
            if(localStorage.getItem('uuid')) {
                localStorage.removeItem('uuid')
            }

            dispatch({ type: REGISTER_USER_FAILURE, payload: error2 });
        });

}

// Login an existing user
export const userLogin = user => dispatch => {
    dispatch({ type: LOGIN_USER_START });

    const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/login/'
    axios.post(endpoint, user).then(res => {
        localStorage.setItem('key', res.data.key);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
    }).catch(err => {
        const error = err.response.data;
        const error2 = error[Object.keys(error)[0]]

        if(localStorage.getItem('key')) {
            localStorage.removeItem('key');
        };
        if(localStorage.getItem('pusherTransportTLS')) {
            localStorage.removeItem('pusherTransportTLS')
        }

        dispatch({ type: LOGIN_USER_FAILURE, payload: error2 });
    })
}

// Logs a user out
export const logoutUser = () => dispatch => {
    if(localStorage.getItem('key')) {
        localStorage.removeItem('key');
    };
    if(localStorage.getItem('pusherTransportTLS')) {
        localStorage.removeItem('pusherTransportTLS')
    }
    if(localStorage.getItem('uuid')) {
        localStorage.removeItem('uuid')
    }

    dispatch({ type: LOGOUT_USER });
}

// Gets the initial information about the user and sets the localstorage
export const getUser = () => dispatch => {
    dispatch({ type: GET_USER_START });

    const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/adv/init/'

    // Get the token from the localstorage
    let token = localStorage.getItem('key');

    // Set the header information
    let config = {
        headers: {
            Authorization: `Token ${token}`
        }
    }

    axios.get(endpoint, config).then(res => {
        if (!localStorage.getItem('uuid')) {
            localStorage.setItem('uuid', res.data.uuid)
        }

        dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    }).catch(err => {
        dispatch({ type: GET_USER_FAILURE, payload: err.response });
    })
}

export const moveUser = (dir) => dispatch => {
    dispatch({ type: MOVE_USER_START});

    // Get the token
    let token = localStorage.getItem('key');

    // Set the headers
    let config = {
        headers: {
            Authorization: `Token ${token}`
        }
    }

    // Set the endpoint
    const endpoint = 'https://tales-of-tacronora.herokuapp.com/api/adv/move/';

    let cmd = { "direction": `${dir}`};
    console.log('MOVE', cmd);

    axios.post(endpoint, cmd, config).then(res => {
        dispatch({ type: MOVE_USER_SUCCESS, payload: res.data})
    }).catch(err => {
        dispatch({ type: MOVE_USER_SUCCESS, payload: err.response})
    })
}

// Clears the main error messages received from the server
export const clearError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR });
}

// Binds the Pusher subscriptions
export const setBind = (bool) => dispatch => {
    dispatch({ type: SET_BIND, payload: bool });
}

// Push message
export const setMessage = (message) => dispatch => {
    dispatch({ type: SET_MESSAGE, payload: message })
}