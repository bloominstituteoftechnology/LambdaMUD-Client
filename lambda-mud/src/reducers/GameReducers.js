import {INITIALIZING,
    INITIALIZED,
    INITIALIZE_FAILED,
    CHANGING_ROOM,
    CHANGED_ROOM,
    MOVE_FAILED,
    SPEAKING,
    SPEAK_SUCCESS,
    SPEAK_FAILED
    } from './../actions/index';

    const initialState = {
        initializing: false,
        initialized: false,
        moving: false,
        speaking: false,
        message: null,
        user: null,
        uuid: null,
        current_room: null,
        room_description: null,
        players: [],
        error_msg: null,
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
                    uuid: payload.uuid,
                    current_room: payload.title,
                    room_description: payload.description,
                    players: payload.players,
                    error_msg: payload.error_msg
                }
            case INITIALIZE_FAILED:
                return {...state, initializing: false, error: payload}

            case CHANGING_ROOM:
                return {...state, moving: true}
            case CHANGED_ROOM:
                return {...state, moving: false, 
                    current_room: payload.title, 
                    room_description: payload.description,
                    players: payload.players,
                    error_msg: payload.error_msg
                }
            case MOVE_FAILED:
                return {...state, moving: false, error: payload}

            case SPEAKING:
                return {...state, speaking: true}
            case SPEAK_SUCCESS:
                return {...state, speaking: false, message: payload}
            case SPEAK_FAILED:
                return {...state, speaking: false, error: payload}
            
            default:
            return state;
        }
    } 
    
    
    
