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
    CLEAR_ERROR,
    SET_BIND,
    SET_MESSAGE,
} from '../actions';

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    username: 'Guest',
    uuid: '',
    error: '',
    binded: false,
    pusherMessage: '',
};

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case MUD_FETCH_START:
            return state;
        case LOGIN_USER_START:
            return { ...state, isLoggingIn: true };
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('key', action.payload.key);
            return { ...state, isLoggingIn: false, isLoggedIn: true };
        case LOGIN_USER_FAILURE:
            if(localStorage.getItem('key')) {
                localStorage.removeItem('key');
            };
            if(localStorage.getItem('pusherTransportTLS')) {
                localStorage.removeItem('pusherTransportTLS')
            }
            return { ...state, isLoggingIn: false, isLoggedIn: false, error: action.payload };
        case LOGOUT_USER:
            if(localStorage.getItem('key')) {
                localStorage.removeItem('key');
            };
            if(localStorage.getItem('pusherTransportTLS')) {
                localStorage.removeItem('pusherTransportTLS')
            }
            if(localStorage.getItem('uuid')) {
                localStorage.removeItem('uuid')
            }
            return { ...state, isLoggingIn: false, isLoggedIn: false, username: 'Guest', uuid: '', error: ''}
        case REGISTER_USER_START:
            return { ...state }
        case REGISTER_USER_SUCCESS:
            // localStorage.setItem('key', action.payload.token);
            return { ...state };
        case REGISTER_USER_FAILURE:
            if(localStorage.getItem('key')) {
                localStorage.removeItem('key');
            };
            if(localStorage.getItem('pusherTransportTLS')) {
                localStorage.removeItem('pusherTransportTLS')
            }
            if(localStorage.getItem('uuid')) {
                localStorage.removeItem('uuid')
            }
            return { ...state, error: action.payload, isLoggingIn: false, isLoggedIn: false, username: 'Guest', uuid: '', };

        case GET_USER_START:
            return state;
        case GET_USER_SUCCESS:
            if (!localStorage.getItem('uuid')) {
                localStorage.setItem('uuid', action.payload.uuid)
            }
            return { ...state, uuid: action.payload.uuid, username: action.payload.name}
        case GET_USER_FAILURE:
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