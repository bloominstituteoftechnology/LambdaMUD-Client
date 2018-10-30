import axios from 'axios';

export const LOGGING_IN_USER = 'LOGGING_IN_USER';
export const LOGGED_IN_USER = 'LOGGED_IN_USER';
export const REGISTERING_USER = 'REGISTERING_USER';
export const REGISTERED_USER = 'REGISTERED_USER';
export const LOGGING_OUT_USER = 'LOGGING_OUT_USER';
export const LOGGED_OUT_USER = 'LOGGED_OUT_USER';
export const FETCHING_INIT_INFO = 'FETCHING_INIT_INFO';
export const FETCHED_INIT_INFO = 'FETCHED_INIT_INFO';
export const FETCH_NEW_MESSAGE = 'FETCH_NEW_MESSAGE';
export const ERROR = 'ERROR';

const url = 'https://jhk-lambdamud.herokuapp.com/api';

export const registerUser = (user, history) => {
  return dispatch => {
    dispatch({ type: REGISTERING_USER });

    axios
      .post(`${url}/registration/`, user)
      .then(res => {
        localStorage.setItem('token', res.data.key);
        dispatch({ type: REGISTERED_USER });
      })
      .then(() => history.push('/game'))
      .catch(err => {
        dispatch({ type: ERROR, payload: err.response });
      });
  };
};

export const loginUser = (user, history) => {
  return dispatch => {
    dispatch({ type: LOGGING_IN_USER });

    axios
      .post(`${url}/login/`, user)
      .then(res => {
        localStorage.setItem('token', res.data.key);
        dispatch({ type: LOGGED_IN_USER });
      })
      .then(() => history.push('/game'))
      .catch(err => {
        dispatch({ type: ERROR, payload: err.response });
      });
  };
};

export const logoutUser = history => {
  return dispatch => {
    dispatch({ type: LOGGING_OUT_USER });
    localStorage.removeItem('token');
    dispatch({ type: LOGGED_OUT_USER });
    history.push('/');
  };
};

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
