import { gameReducers } from './GameReducers';
import { userReducers } from './UserReducers';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    users: userReducers,
    game: gameReducers
})

