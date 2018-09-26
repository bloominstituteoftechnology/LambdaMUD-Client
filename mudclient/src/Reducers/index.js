import {LOGIN, REGISTER, LOGGING_IN, REGISTERING} from '../Actions';

const initialState = {
loggedin: false,
logging_in: false,
registering: false,
user: null,
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
        return Object.assign({}, state, {loggedin:true})
        default:
        return state;
    }
}

export default rootReducer;