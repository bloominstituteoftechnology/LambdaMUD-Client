import axios from 'axios';


export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGGING_OUT = 'LOGGING_OUT';
export const LOGGED_OUT = 'LOGGED_OUT';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const CREATING_USER = 'CREATING_USER';
export const USER_CREATED = 'USER_CREATED';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const INITIALIZING = 'INITIALIZING';
export const INITIALIZED = 'INITIALIZED';
export const INITIALIZE_FAILED = 'INITIALIZE_FAILED';


export function loginUser (user, history) {
    return(dispatch) =>{
    dispatch({type: LOGGING_IN});
    console.log('logging in');
    axios.post('http://localhost:8000/api/login', user)
      .then(({data}) => {
          console.log(data)
          localStorage.setItem("token", JSON.stringify(data));
          dispatch({type: LOGGED_IN, payload: data});
          history.push('/adventure');;
      })
      .catch(err => {
          console.log(err);
          dispatch({type: LOGIN_FAILED, error: err})
      })
    }
}
export function logoutUser (history) {
    return(dispatch) => {
        dispatch({type: LOGGING_OUT});
        localStorage.removeItem('token'); 
        dispatch({type: LOGGED_OUT});
        history.push('/');
    }
}

export function createUser (user, history) {
    return(dispatch) =>{
        dispatch({type: CREATING_USER});
        axios.post('http://localhost:8000/api/registration', user)
        .then(({data}) => {
            console.log(data)
            localStorage.setItem("token", JSON.stringify(data));
            dispatch({type: USER_CREATED, payload: data});
            history.push('/adventure');
        })
        .catch(err => {
            console.log(err);
            dispatch({type: REGISTER_FAILED, error: err})
      })
    }
}

export function initializeGame () {
    return(dispatch) => {
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(token)
        dispatch({type: INITIALIZING});
        axios.post('http://localhost:8000/api/adv/init', token)
        .then(({data}) => {
            dispatch({type: INITIALIZED, payload: data});
        })
        .catch(err => {
            console.log(err);
            dispatch({type: INITIALIZE_FAILED})
        })
    }
}

