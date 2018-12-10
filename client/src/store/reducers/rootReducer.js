import {
    MUD_FETCH_START,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
} from '../actions';

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    username: 'Guest',
    error: '',
};

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case MUD_FETCH_START:
            return state;
        case LOGIN_USER_START:
            return { ...state, isLoggingIn: true };
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('key', action.payload.key);
            return { ...state, isLoggingIn: false, isLoggedIn: true, username: action.payload.username };
        case LOGIN_USER_FAILURE:
            if(localStorage.getItem('key')) {
                localStorage.removeItem('key');
            };
            return { ...state, isLoggingIn: false, isLoggedIn: false, error: action.payload };
        default:
            return state;
    }
};