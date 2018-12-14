import {
    REGISTERING,
    REGISTERED,
    REGISTER_FAILURE,
    LOGGING_IN,
    LOGGED_IN,
    LOGGING_OUT,
    LOGGED_OUT,
    INITIALIZING,
    INITIALIZED,
    MOVING,
    MOVED,
    ERROR
    } from '../actions/index';

const initialState = {
    registering: false,
    registered: false,
    logging_in: false,
    logged_in: false,
    isLoggedIn: false,
    error: null,
    res_data: {},
    readout: {}
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case REGISTERING:
            return Object.assign({}, state, {
                registering: true
            })

        case REGISTERED:
            return Object.assign({}, state, {
                registering: false,
                registered: true,
                isLoggedIn: true
            })

        case LOGGED_IN:
            return Object.assign({}, state, {
                isLoggedIn: true
            })

        case INITIALIZED:
            return Object.assign({}, state, {
                readout: action.payload
            })

        case MOVED:
            return Object.assign({}, state, {
                readout: action.payload
            })

        default:
            return state;
    }
}