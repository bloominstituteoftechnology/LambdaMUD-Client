//import * as actionTypes from './actions';
export const REGISTERING_USER = "REGISTERING_USER";
export const REGISTERED_USER = "REGISTERED_USER";
export const LOGGING_IN_USER = "LOGGING_IN_USER";
export const LOGGED_IN_USER = "LOGGED_IN_USER";
export const LOGGING_OUT_USER = "LOGGING_OUT_USER";
export const LOGGED_OUT_USER = "LOGGED_OUT_USER";
export const FETCHING_INIT_INFO = "FETCHING_INIT_INFO";
export const FETCHED_INIT_INFO = "FETCHED_INIT_INFO";
export const FETCH_NEW_MESSAGE = "FETCH_NEW_MESSAGE";
export const MOVING_PLAYER = "MOVING_PLAYER";
export const MOVED_PLAYER = "MOVED_PLAYER";
export const TALKING_PLAYER = "TALKING_PLAYER";
export const TALKED_PLAYER = "TALKED_PLAYER";
export const ERROR = "ERROR";


const initialState = {
    registeringUser: false,
    loggingInUser: false,
    loggingOutUser: false,
    fetchingInit: false,
    movingPlayer: false,
    talkingPlayer: false,
    title: '',
    description: '',
    name: '',
    players: [],
    data: [],
    uuid: '',
    error: null
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTERING_USER:
            return {
                ...state,
                registeringUser: true
            };
        case REGISTERED_USER:
            return {
                ...state,
                registeringUser: false
            };
        case LOGGING_IN_USER:
            return {
                ...state,
                loggingInUser: true
            };
        case LOGGED_IN_USER:
            return {
                ...state,
                loggingInUser: false,
                error: null
            };
        case LOGGING_OUT_USER:
            return {
                ...state,
                loggingOutUser: true
            };
        case LOGGED_OUT_USER:
            return {
                ...state,
                loggingOutUser: false,
                error: null
            };
        case FETCHING_INIT_INFO:
            return {
                ...state,
                fetchingInit: true
            };
        case FETCHED_INIT_INFO:
            const { title, name, players, description, uuid } = action.payload;
            const message = `${title}: ${description} Other players: ${players.join(
                ' '
            )}`;
            return {
                ...state,
                fetchingInit: false,
                title,
                name,
                players,
                description,
                uuid,
                data: [...state.data, message],
                error: null
            };
        case FETCH_NEW_MESSAGE:
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case MOVING_PLAYER:
            return {
                ...state,
                movingPlayer: true
            };
        case MOVED_PLAYER:
            const newMessage = `${action.payload.title}: ${
                action.payload.description
                } Other players: ${action.payload.players.join(' ')}`;
            return {
                ...state,
                movingPlayer: false,
                data: [...state.data, newMessage]
            };
        case TALKING_PLAYER:
            return {
                ...state,
                talkingPlayer: true
            };
        case TALKED_PLAYER:
            const selfMessage = `You said ${
                action.payload.message
                } to the players in ${action.payload.title}.`;
            return {
                ...state,
                talkingPlayer: false,
                data: [...state.data, selfMessage]
            };

        case ERROR:
            return {
                ...state,
                registeringUser: false,
                loggingInUser: false,
                loggingOutUser: false,
                movingPlayer: false,
                talkingPlayer: false,
                error: action.payload
            };
        default:
            return state;
    }
};
