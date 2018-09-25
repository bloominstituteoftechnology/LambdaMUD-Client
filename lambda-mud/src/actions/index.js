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


//sends request to server to login using user credentials and if successful, redirects to game path
export function loginUser (user, history) {
    return(dispatch) =>{
    dispatch({type: LOGGING_IN});
    console.log('logging in');
    axios.post('https://vast-caverns-12453.herokuapp.com/api/login', user)
      .then(({data}) => {
          console.log(data)
          localStorage.setItem("token", JSON.stringify(data));
          dispatch({type: LOGGED_IN, payload: data});
          history.push('/adventure');
      })
      .catch(err => {
          console.log(err);
          dispatch({type: LOGIN_FAILED, error: err})
      })
    }
}

//logs out user by removing token from localStorage
export function logoutUser (history) {
    return(dispatch) => {
        dispatch({type: LOGGING_OUT});
        localStorage.removeItem('token'); 
        dispatch({type: LOGGED_OUT});
        history.push('/');
    }
}

//sends request to server to register new user, then redirects to game path
export function createUser (user, history) {
    return(dispatch) =>{
        dispatch({type: CREATING_USER});
        axios.post('https://vast-caverns-12453.herokuapp.com/api/registration/', user)
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

//sends request to server with token to initialize game
export function initializeGame () {
    return(dispatch) => {
        let token = localStorage.getItem("token")
        token = JSON.parse(token);
        token = String(Object.values(token));
        const headers = {
            'Authorization': 'Token ' + token
        }
        console.log(headers);
        dispatch({type: INITIALIZING});
        axios.get('https://vast-caverns-12453.herokuapp.com/api/adv/init/', {headers:headers})
        .then(({data}) => {
            console.log(data);
            dispatch({type: INITIALIZED, payload: data});
        })
        .catch(err => {
            console.log(err);
            dispatch({type: INITIALIZE_FAILED})
        })
    }
}

