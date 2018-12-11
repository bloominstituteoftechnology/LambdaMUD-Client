import {REGISTERING, REGISTERED, REGISTER_FAILURE, LOGGING_IN, LOGGED_IN, ERROR} from '../actions/index';

const initialState = {
    registering: false,
    registered: false,
    logging_in: false,
    logged_in: false,
    isLoggedIn: false,
    error: null,
    res_data: {}
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
                res_data: action.payload
            })

        default:
            return state;
    }
}