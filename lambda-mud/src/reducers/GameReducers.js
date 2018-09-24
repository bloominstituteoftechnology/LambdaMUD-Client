import {INITIALIZING,
    INITIALIZED,
    INITIALIZE_FAILED} from './../actions/index';

    const initialState = {
        initializing: false,
        initialized: false,
        user: null,
        current_room: null,
        room_description: null,
        players: [],
        error: null
    }
    
    export const gameReducers = (state=initialState, {type, payload}) => {
        switch (type) {
            case INITIALIZING:
                return {...state, initializing: true}
            case INITIALIZED:
                return {...state, 
                    initializing: false, 
                    initialized: true, 
                    user: payload.name,
                    current_room: payload.title, 
                    room_description: payload.description,
                    players: payload.players 
                }
            case INITIALIZE_FAILED:
                return {...state, initializing: false, error: payload}
            
            default:
            return state;
        }
    } 
    
    
    
