import axios from 'axios';
export const FETCHING_INIT_INFO = 'FETCHING_INIT_INFO';
export const FETCHED_INIT_INFO = 'FETCHED_INIT_INFO';
export const FETCH_NEW_MESSAGE = 'FETCH_NEW_MESSAGE';
export const MOVING_PLAYER = 'MOVING_PLAYER';
export const MOVED_PLAYER = 'MOVED_PLAYER';
export const TALKING_PLAYER = 'TALKING_PLAYER';
export const TALKED_PLAYER = 'TALKED_PLAYER';
export const ERROR = 'ERROR';

const url = 'https://muddymud.herokuapp.com/api';

export const fetchInitInfo = token => {
    return dispatch => {
        dispatch({ type: FETCHING_INIT_INFO });
        const authToken = `Token ${token}`;

        axios
        .get(`${url}/adv/init/`, { headers: { Authorization: authToken } })
        .then(res => {
            dispatch({ type: FETCHED_INIT_INFO, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
};

export const fetchNewMessage = message => {
    return {
        type: FETCH_NEW_MESSAGE,
        payload: message
    };
};

export const movePlayer = (direction, token) => {
    return dispatch => {
        dispatch({ type: MOVING_PLAYER });
        const authToken = `Token ${token}`;

        axios
        .post(
            `${url}/adv/move/`,
            { direction },
            { headers: { Authorization: authToken } }
        )
        .then(res => {
            dispatch({ type: MOVED_PLAYER, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
};

export const talkPlayer = (message, token) => {
    return dispatch => {
        dispatch({ type: TALKING_PLAYER });
        const authToken = `Token ${token}`;

        axios
        .post(
            `${url}/adv/say/`,
            { message },
            { headers: { Authorization: authToken } }
        )
        .then(res => {            
            dispatch({ type: TALKED_PLAYER, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: ERROR, payload: err.response });
        });
    };
};