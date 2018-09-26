import {combineReducers, createStore, applyMiddleware} from 'redux'
import playReducer from '../components/Play/reducer'
import Thunk from 'redux-thunk'
import logger from 'redux-logger'

const rootReducer = combineReducers({
    play: playReducer
})

const store = createStore(
    rootReducer, applyMiddleware(Thunk, logger), /* preloadedState, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store