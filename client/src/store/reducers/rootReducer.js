import {
    MUD_FETCH_START,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    MOVE_USER_START,
    MOVE_USER_SUCCESS,
    MOVE_USER_FAILURE,
    CLEAR_ERROR,
    SET_BIND,
    SET_MESSAGE,
} from '../actions';

// Initial state
const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    username: 'Guest',
    uuid: '',
    error: '',
    binded: false,
    pusherMessage: '',
};

// Root Reducer. Takes in a state and action. Executes a specific action when called.
export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case MUD_FETCH_START:
            return state;
        case LOGIN_USER_START:
            return { ...state, isLoggingIn: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, isLoggingIn: false, isLoggedIn: true };
        case LOGIN_USER_FAILURE:
            return { ...state, isLoggingIn: false, isLoggedIn: false, error: action.payload };
        case LOGOUT_USER:
            return { ...state, isLoggingIn: false, isLoggedIn: false, username: 'Guest', uuid: '', error: ''}
        case REGISTER_USER_START:
            return { ...state }
        case REGISTER_USER_SUCCESS:
            return { ...state };
        case REGISTER_USER_FAILURE:
            return { ...state, error: action.payload, isLoggingIn: false, isLoggedIn: false, username: 'Guest', uuid: '', };
        case GET_USER_START:
            return state;
        case GET_USER_SUCCESS:
            return { ...state, uuid: action.payload.uuid, username: action.payload.name, roomTitle: action.payload.title, roomDesc: action.payload.description }
        case GET_USER_FAILURE:
            return { ...state, error: action.payload}
        case MOVE_USER_START:
            return state;
        case MOVE_USER_SUCCESS:
            return { ...state, roomTitle: action.payload.title, roomDesc: action.payload.description}
        case MOVE_USER_FAILURE:
            return { ...state, error: action.payload}
        case CLEAR_ERROR:
            return { ...state, error: ''}
        case SET_BIND:
            return { ...state, binded: action.payload }
        case SET_MESSAGE:
            return { ...state, pusherMessage: action.payload }
        default:
            return state;
    }
};