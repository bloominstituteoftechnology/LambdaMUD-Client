import {REGISTERING, REGISTERED, LOGGINGIN, LOGGEDIN, INITIALIZING, INITIALIZED, MOVING, MOVED} from './actions.js';

const initialState = {
    registering: false,
    loggingin: false,
    loggedin: false,
    initilizing: false,
    initialized: true,
    key: '',
    title: '',
    description: '',
    moving: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case REGISTERING:
            return{
                registering: true
            }
        case REGISTERED:
            return{
                registering: false,
                loggedin: true,
                key: action.payload
            }
        case LOGGINGIN:
            return{
                loggingin: true
            }
        case LOGGEDIN:
            return{
                loggingin: false,
                loggedin: true,
                key: action.payload
            }
        case INITIALIZING:
            return{
                ...state,
                initializing: true
            }
        case INITIALIZED:
            return{
                ...state,
                initializing: false,
                initialized: true,
                title: action.payload['title'],
                description: action.payload['description']
            }
        case MOVING:
            return{
                ...state,
                moving: true
            }
        case MOVED:
            return{
                ...state,
                moving: false,
                title: action.payload['title'],
                description: action.payload['description']
            }
        default:
            return state;
    }
}

export default reducer;